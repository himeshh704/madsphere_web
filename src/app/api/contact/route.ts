import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name ?? "";
    const phone = body.phone ?? "";
    const email = body.email ?? "";
    const company = body.company ?? "";
    const service = body.service ?? "";
    const budget = body.budget ?? "";
    const message = body.message ?? "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"MadSphere Contact" <${process.env.GMAIL_USER}>`,
      to: "madsphere.info@gmail.com",
      replyTo: email,
      subject: `New Lead — ${service || "General"} — ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
          <div style="border-left: 4px solid #0047FF; padding-left: 20px; margin-bottom: 32px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #111;">New Contact Inquiry</h1>
            <p style="margin: 4px 0 0; color: #555; font-size: 14px;">${service || "General Inquiry"}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 130px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #0047FF;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111;">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111;">${company || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111;">${budget || "—"}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; background: #f8f8f8; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #aaa; text-align: center;">Sent via MadSphere Contact · madsphere.info@gmail.com</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"MadSphere Studio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We got your message, ${name.split(" ")[0]}. 👋`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
          <h1 style="font-size: 26px; font-weight: 800; color: #111; margin-bottom: 8px;">Hey ${name.split(" ")[0]}, we got it.</h1>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px;">
            Thanks for reaching out to MadSphere regarding <strong>${service || "your project"}</strong>. We've received your inquiry.
          </p>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px;">
            Our team will review your message and get back to you within 24 hours.
          </p>
          <a href="https://madsphere.in" style="display: inline-block; background: #0047FF; color: white; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; padding: 14px 28px; border-radius: 100px; text-decoration: none;">Explore our work →</a>
          <p style="margin-top: 40px; font-size: 12px; color: #aaa;">MadSphere Studio · Mumbai</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact] Error:", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
