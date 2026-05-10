import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { name, email, phone, service, subject, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        error: "Email and message are required",
      });
    }

    const data = await resend.emails.send({
      from: "Webcore Solutions <onboarding@resend.dev>",
      to: ["info@webcoreuae.com"],
      replyTo: email,
      subject: subject || "New Contact Form Message",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Service:</strong> ${service || "N/A"}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
}