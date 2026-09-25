// Small backend that emails the RSVP answers.
// Run with:  npm run server   (reads .env.local)
// Needs in .env.local: SMTP_USER, SMTP_PASS (Gmail App Password), CONTACT_EMAIL
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

// Some networks/routers advertise IPv6 but don't actually route it anywhere,
// which makes Node try smtp.gmail.com's IPv6 address first and get an
// immediate ECONNREFUSED before ever trying IPv4. Prefer IPv4 to avoid that.
dns.setDefaultResultOrder("ipv4first");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const port = Number(process.env.PORT || 3001);

const { SMTP_USER, SMTP_PASS, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL } = process.env;

if (!SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
  console.warn("Missing SMTP_USER, SMTP_PASS or CONTACT_EMAIL in .env.local - emails will fail.");
}

// SMTP_INSECURE=true is a LOCAL-ONLY escape hatch for the classic Windows
// "unable to verify the first certificate" error, usually caused by antivirus
// or a corporate/school network doing TLS inspection on port 465. It skips
// certificate verification - never set this in production.
const insecure = process.env.SMTP_INSECURE === "true";
if (insecure) {
  console.warn("SMTP_INSECURE=true - certificate verification is DISABLED. For local debugging only.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  ...(insecure ? { tls: { rejectUnauthorized: false } } : {}),
});

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

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

  const rows = [
    ["Name", name],
    ["Attending", attending],
    ["Guests", attending === "Yes" ? String(guests) : "-"],
    ["Message", message || "-"],
    ["Site", NEXT_PUBLIC_SITE_URL || "-"],
  ];

  try {
    await transporter.sendMail({
      from: `"Wedding RSVP" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      subject: `RSVP: ${name} - ${attending === "Yes" ? "attending" : "not attending"}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html:
        "<table cellpadding='6' style='font-family:sans-serif;font-size:14px'>" +
        rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("") +
        "</table>" +
        (drawing ? "<p><b>Handwritten message:</b></p><img src='cid:drawing' style='max-width:100%;border:1px solid #ccc'>" : ""),
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
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".mp3": "audio/mpeg",
  ".json": "application/json",
};

// Serves the built site (npm run build) so one process handles everything in production.
const serveStatic = (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(distDir, urlPath);
  if (!file.startsWith(distDir)) return sendJson(res, 403, { error: "Forbidden" });
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(distDir, "index.html");
  if (!fs.existsSync(file)) return sendJson(res, 404, { error: "Run npm run build first" });
  res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/rsvp") return handleRsvp(req, res);
    if (req.method === "GET") return serveStatic(req, res);
    sendJson(res, 405, { error: "Method not allowed" });
  })
  .listen(port, () => console.log(`RSVP server on http://localhost:${port}`));
