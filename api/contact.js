import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { name, email, phone, service, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    const data = await resend.emails.send({
      from: "Webcore Solutions <no-reply@webcoreuae.com>",
      to: ["info@webcoreuae.com"],
      replyTo: email,
      subject: `[Contact Form] ${subject || "New Message"} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #eee;" />
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Service:</b> ${service || "N/A"}</p>
          <p><b>Subject:</b> ${subject || "N/A"}</p>
          <p><b>Message:</b></p>
          <p style="background:#f5f5f5; padding: 12px; border-radius: 6px;">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}