import nodemailer from "nodemailer";

// Reused across the app to send order notifications and contact form
// messages to the bakery's admin inbox. Uses Gmail SMTP with an App
// Password (see .env.example for setup instructions).
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

// Sends an email to the admin inbox. Never throws — logs and swallows
// errors so a broken email config can't block an order or contact form
// submission from succeeding.
export const sendAdminEmail = async ({ subject, html, replyTo }: MailOptions): Promise<void> => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️  Email not configured (EMAIL_USER/EMAIL_PASS/ADMIN_EMAIL) — skipping email send.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"The Misty Bakers Website" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    console.log(`📧 Email sent: ${subject}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};

export default transporter;