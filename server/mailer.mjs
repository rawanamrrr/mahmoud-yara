// Shared Gmail setup, used by the server and by the `npm run test-email` script.
// Needs in .env.local: SMTP_USER, SMTP_PASS (Gmail App Password), CONTACT_EMAIL
import dns from "node:dns/promises";
import nodemailer from "nodemailer";

export const { SMTP_USER, SMTP_PASS, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL } = process.env;

export const missingEnv = ["SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"].filter((key) => !process.env[key]);

// SMTP_INSECURE=true is a LOCAL-ONLY escape hatch for the classic Windows
// "unable to verify the first certificate" error, usually caused by antivirus
// or a corporate/school network doing TLS inspection on port 465. It skips
// certificate verification - never set this in production.
const insecure = process.env.SMTP_INSECURE === "true";
if (insecure) {
  console.warn("SMTP_INSECURE=true - certificate verification is DISABLED. For local debugging only.");
}

const GMAIL_HOST = "smtp.gmail.com";
// Port 587 (STARTTLS) is Gmail's standard "submission" port and is the most
// widely allowed one. Set SMTP_PORT=465 in .env.local to use implicit TLS instead.
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);

// nodemailer picks RANDOMLY between Gmail's IPv4 and IPv6 addresses. Many
// networks/routers advertise IPv6 but don't actually route it, so about half
// the sends would fail with ECONNREFUSED on the IPv6 address. So we look up the
// IPv4 address ourselves and connect to that; `servername` keeps the TLS
// certificate check pointed at smtp.gmail.com.
const getTransport = async () => {
  const { address } = await dns.lookup(GMAIL_HOST, { family: 4 });
  return nodemailer.createTransport({
    host: address,
    port: SMTP_PORT,
    // 465 = TLS from the first byte; 587 = starts plain, then upgrades (STARTTLS).
    secure: SMTP_PORT === 465,
    requireTLS: SMTP_PORT !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { servername: GMAIL_HOST, ...(insecure ? { rejectUnauthorized: false } : {}) },
  });
};

// Same two methods the rest of the code already uses.
export const transporter = {
  verify: async () => (await getTransport()).verify(),
  sendMail: async (message) => (await getTransport()).sendMail(message),
};

// Turns the raw error into what to actually do about it.
export const explainMailError = (error) => {
  const text = `${error.code || ""} ${error.message || ""}`;
  if (/certificate|CERT_|self.signed/i.test(text)) {
    return "TLS certificate problem: something on this computer/network (antivirus 'Mail Shield' such as Avast, or a proxy) is intercepting the connection to Gmail. On a normal server this does not happen. Locally, turn off the antivirus mail scanning or use another network.";
  }
  if (/EAUTH|Invalid login|Username and Password not accepted|535/i.test(text)) {
    return "Gmail rejected the login. SMTP_PASS must be a Gmail *App Password* (16 letters, needs 2-Step Verification on), not your normal password.";
  }
  if (/ETIMEDOUT|ECONNREFUSED|ECONNRESET|ENETUNREACH|EHOSTUNREACH|ESOCKET|Connection closed/i.test(text)) {
    return "Could not keep a connection to smtp.gmail.com open. On your own PC this is usually antivirus (e.g. Avast Mail Shield) or a firewall cutting it; on a server, the host may block outgoing mail ports - check the provider's firewall/SMTP policy.";
  }
  return "Unknown mail error - see the message above.";
};
