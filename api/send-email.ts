import process from "process";
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
    const {
      name,
      email,
      phone,
      service,
      subject,
      message,
    } = req.body;

    const data = await resend.emails.send({
      from: "Webcore Solutions <onboarding@resend.dev>",

      to: ["info@webcoreuae.com"],

      replyTo: email,

      subject: subject || "New Contact Form Message",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone || "N/A"}</p>

          <p><strong>Service:</strong> ${service || "N/A"}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <hr />

          <p><strong>Message:</strong></p>

          <p>${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Failed to send email",
    });
  }
}