// Builds the RSVP email (subject + plain text + HTML).
// Email clients ignore most modern CSS, so this uses tables and inline styles only.

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Wedding palette (same as the website).
const GREEN = "#3c4736";
const OLIVE = "#727c5a";
const CREAM = "#f1ebdf";
const PAPER = "#faf8f4";
const SERIF = "Georgia, 'Times New Roman', serif";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  }).format(date);

const row = (label, valueHtml) => `
  <tr>
    <td style="padding:14px 0;border-bottom:1px solid #e6dfcf;width:38%;vertical-align:top;font:12px ${SERIF};letter-spacing:1.5px;text-transform:uppercase;color:${OLIVE};">${label}</td>
    <td style="padding:14px 0;border-bottom:1px solid #e6dfcf;vertical-align:top;font:16px ${SERIF};color:${GREEN};">${valueHtml}</td>
  </tr>`;

export const buildRsvpEmail = ({ name, attending, guests, message, hasDrawing, siteUrl, receivedAt = new Date() }) => {
  const yes = attending === "Yes";
  const when = formatDate(receivedAt);

  // Subjects are plain-text headers: keep them on one line (no header injection).
  const subjectName = name.replace(/\s+/g, " ");
  const subject = yes
    ? `RSVP · ${subjectName} · Attending${guests > 1 ? ` (${guests} guests)` : ""}`
    : `RSVP · ${subjectName} · Can't attend`;

  const badge = yes
    ? `<span style="display:inline-block;padding:6px 14px;border-radius:999px;background:#e3ead8;color:#2f5a2a;font:bold 13px ${SERIF};">✓ Will attend</span>`
    : `<span style="display:inline-block;padding:6px 14px;border-radius:999px;background:#f3dcd7;color:#8a3a2e;font:bold 13px ${SERIF};">✕ Can't attend</span>`;

  const messageBlock = message
    ? `<div dir="auto" style="margin-top:6px;padding:14px 16px;background:${CREAM};border-left:3px solid ${OLIVE};border-radius:4px;font:16px/1.6 ${SERIF};color:${GREEN};">${escapeHtml(message).replace(/\n/g, "<br>")}</div>`
    : `<span style="color:#9a9684;">—</span>`;

  const drawingBlock = hasDrawing
    ? `
      <tr>
        <td colspan="2" style="padding:20px 0 4px;font:12px ${SERIF};letter-spacing:1.5px;text-transform:uppercase;color:${OLIVE};">Handwritten message</td>
      </tr>
      <tr>
        <td colspan="2" style="padding:6px 0 0;">
          <img src="cid:drawing" alt="Handwritten message" style="display:block;max-width:100%;height:auto;border:1px solid #e6dfcf;border-radius:8px;background:#ffffff;">
        </td>
      </tr>`
    : "";

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(subject)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="background:${GREEN};border-radius:14px 14px 0 0;padding:30px 28px;text-align:center;">
            <div style="font:12px ${SERIF};letter-spacing:3px;text-transform:uppercase;color:#cfd6bf;">New RSVP</div>
            <div style="margin-top:8px;font:italic 30px ${SERIF};color:#ffffff;">Mahmoud &amp; Yara</div>
          </td>
        </tr>
        <tr>
          <td style="background:${PAPER};border-radius:0 0 14px 14px;padding:28px;">
            <div dir="auto" style="font:26px ${SERIF};color:${GREEN};">${escapeHtml(name)}</div>
            <div style="margin-top:12px;">${badge}</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid #e6dfcf;">
              ${yes ? row("Guests", `${guests} ${guests === 1 ? "person" : "people"}`) : ""}
              ${row("Message", messageBlock)}
              ${row("Received", escapeHtml(when))}
              ${drawingBlock}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 8px;text-align:center;font:12px ${SERIF};color:#8b8772;">
            Sent automatically from your wedding website${siteUrl ? ` · <a href="${escapeHtml(siteUrl)}" style="color:${OLIVE};">${escapeHtml(siteUrl)}</a>` : ""}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "New RSVP - Mahmoud & Yara",
    "",
    `Name: ${name}`,
    `Attending: ${yes ? "Yes" : "No"}`,
    ...(yes ? [`Guests: ${guests}`] : []),
    `Message: ${message || "-"}`,
    ...(hasDrawing ? ["Handwritten message: attached as message.png"] : []),
    `Received: ${when}`,
    ...(siteUrl ? ["", siteUrl] : []),
  ].join("\n");

  return { subject, html, text };
};
