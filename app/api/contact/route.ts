import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  if (typeof name !== "string" || name.trim().length < 1)
    errors.name = "Name is required.";
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "A valid email address is required.";
  if (typeof message !== "string" || message.trim().length < 2)
    errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const ownerEmail = process.env.CONTACT_OWNER_EMAIL ?? "htmoondev@gmail.com";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);

  if (!smtpUser || !smtpPass) {
    console.error("SMTP credentials not configured.");
    return NextResponse.json(
      { error: "Mail service is not configured." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  // Notification to owner
  const ownerMail = {
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: ownerEmail,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
  };

  // Auto-reply to visitor
  const replyMail = {
    from: `"Portfolio" <${smtpUser}>`,
    to: email,
    subject: "Got your message — I will be in touch soon.",
    text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will reply within one business day.\n\nBest,\nMaurice`,
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out. I have received your message and will reply within one business day.</p>
      <p>Best,<br />Maurice</p>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(replyMail),
    ]);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Mail send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
