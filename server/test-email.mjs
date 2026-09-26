// Sends ONE test email to CONTACT_EMAIL so you can check the setup end-to-end.
// Run with:  npm run test-email
import { transporter, SMTP_USER, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL, missingEnv, explainMailError } from "./mailer.mjs";
import { buildRsvpEmail } from "./email-template.mjs";

if (missingEnv.length) {
  console.error(`Missing in .env.local: ${missingEnv.join(", ")}`);
  process.exit(1);
}

try {
  console.log(`Checking the connection to Gmail as ${SMTP_USER} ...`);
  await transporter.verify();
  console.log("Connection and login OK. Sending a test email ...");

  // A sample RSVP in the real design, so you can see exactly what guests will produce.
  const sample = buildRsvpEmail({
    name: "Test Guest",
    attending: "Yes",
    guests: 2,
    message: "This is a test message - if you can read this, RSVP emails work.",
    hasDrawing: false,
    siteUrl: NEXT_PUBLIC_SITE_URL,
  });
  const info = await transporter.sendMail({
    from: `"Wedding RSVP" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `[TEST] ${sample.subject}`,
    text: sample.text,
    html: sample.html,
  });
  console.log(`Sent! Check the inbox (and spam) of ${CONTACT_EMAIL}. Accepted by Gmail: ${info.accepted.join(", ")}`);
} catch (error) {
  console.error("FAILED:", error.message);
  console.error("=> " + explainMailError(error));
  process.exit(1);
}
