// Starts the website (Vite) AND the email server together, so the RSVP form
// always has its backend. Run with:  npm run dev:all   (Ctrl+C stops both)
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const processes = [
  {
    label: "site ",
    args: [path.join(root, "node_modules", "vite", "bin", "vite.js")],
  },
  {
    label: "email",
    args: ["--use-system-ca", "--env-file-if-exists=.env.local", path.join(root, "server", "index.mjs")],
  },
];

const children = [];
let stopping = false;

const stopAll = (code = 0) => {
  if (stopping) return;
  stopping = true;
  children.forEach((child) => child.kill());
  setTimeout(() => process.exit(code), 300);
};

for (const { label, args } of processes) {
  const child = spawn(process.execPath, args, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  children.push(child);

  const prefix = (stream, out) => {
    let buffer = "";
    stream.on("data", (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      lines.forEach((line) => out.write(`[${label}] ${line}\n`));
    });
  };
  prefix(child.stdout, process.stdout);
  prefix(child.stderr, process.stderr);

  child.on("exit", (code) => {
    if (!stopping) {
      console.error(`[${label}] stopped (exit code ${code}). Stopping the other one too.`);
      stopAll(code ?? 1);
    }
  });
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
process.on("exit", () => children.forEach((child) => child.kill()));
