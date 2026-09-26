// Small backend that emails the RSVP answers.
// Run with:  npm run server   (reads .env.local)
// Needs in .env.local: SMTP_USER, SMTP_PASS (Gmail App Password), CONTACT_EMAIL
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  transporter,
  SMTP_USER,
  CONTACT_EMAIL,
  NEXT_PUBLIC_SITE_URL,
  missingEnv,
  explainMailError,
} from "./mailer.mjs";
import { buildRsvpEmail } from "./email-template.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const port = Number(process.env.PORT || 3001);

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

// Very small in-memory rate limit: 5 requests per IP per 10 minutes.
const hits = new Map();
const tooMany = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const sendJson = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });

const handleRsvp = async (req, res) => {
  const ip = req.socket.remoteAddress || "unknown";
  if (tooMany(ip)) return sendJson(res, 429, { error: "Too many requests" });

  let data;
  try {
    data = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { error: "Invalid request" });
  }

  const name = clean(data.name, 100);
  const attending = data.attending === "no" ? "No" : "Yes";
  const guests = attending === "Yes" ? Math.min(Math.max(parseInt(data.guests, 10) || 1, 1), 10) : 0;
  const message = clean(data.message, 500);

  if (!name) return sendJson(res, 400, { error: "Name is required" });

  // Optional handwritten message: a PNG data URL (max ~1.5 MB).
  let drawing = null;
  if (typeof data.drawing === "string") {
    const match = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(data.drawing);
    if (!match || match[1].length > 2_000_000) return sendJson(res, 400, { error: "Invalid drawing" });
    drawing = Buffer.from(match[1], "base64");
  }

  const { subject, text, html } = buildRsvpEmail({
    name,
    attending,
    guests,
    message,
    hasDrawing: Boolean(drawing),
    siteUrl: NEXT_PUBLIC_SITE_URL,
  });

  try {
    await transporter.sendMail({
      from: `"Wedding RSVP" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      subject,
      text,
      html,
      attachments: drawing
        ? [{ filename: "message.png", content: drawing, cid: "drawing", contentType: "image/png" }]
        : [],
    });
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Email failed:", error.message);
    sendJson(res, 500, { error: "Could not send email" });
  }
};

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Serves the built site (npm run build) so one process handles everything in production.
// - correct Content-Type for every file type (link-preview crawlers check it)
// - Range requests: iPhone Safari refuses to play a video unless the server
//   can send it in pieces (HTTP 206)
// - files in /assets/ have hashed names, so they can be cached for a year
const serveStatic = (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(distDir, urlPath);
  if (!file.startsWith(distDir)) return sendJson(res, 403, { error: "Forbidden" });
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(distDir, "index.html");
  if (!fs.existsSync(file)) return sendJson(res, 404, { error: "Run npm run build first" });

  const { size } = fs.statSync(file);
  const headers = {
    "Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Accept-Ranges": "bytes",
    "Cache-Control": file.includes(`${path.sep}assets${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  };

  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
  if (range) {
    let start = range[1] === "" ? size - Number(range[2]) : Number(range[1]);
    let end = range[1] === "" || range[2] === "" ? size - 1 : Math.min(Number(range[2]), size - 1);
    start = Math.max(start, 0);
    if (start > end || start >= size) {
      res.writeHead(416, { "Content-Range": `bytes */${size}` });
      return res.end();
    }
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    if (req.method === "HEAD") return res.end();
    return fs.createReadStream(file, { start, end }).pipe(res);
  }

  res.writeHead(200, { ...headers, "Content-Length": size });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/rsvp") return handleRsvp(req, res);
    if (req.method === "GET" || req.method === "HEAD") return serveStatic(req, res);
    sendJson(res, 405, { error: "Method not allowed" });
  })
  .listen(port, () => {
    console.log(`RSVP server on http://localhost:${port}`);
    if (missingEnv.length) {
      console.error(`EMAIL NOT CONFIGURED - missing in .env.local: ${missingEnv.join(", ")}`);
      return;
    }
    // Check the Gmail login right away so a broken setup shows up now,
    // not when the first guest submits.
    transporter
      .verify()
      .then(() => console.log(`Email OK - RSVPs will be sent from ${SMTP_USER} to ${CONTACT_EMAIL}`))
      .catch((error) => {
        console.error(`EMAIL NOT WORKING: ${error.message}`);
        console.error(`=> ${explainMailError(error)}`);
      });
  });
