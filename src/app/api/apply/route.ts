import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name       = formData.get("name")?.toString() ?? "";
    const email      = formData.get("email")?.toString() ?? "";
    const role       = formData.get("role")?.toString() ?? "";
    const portfolio  = formData.get("portfolio")?.toString() ?? "";
    const message    = formData.get("message")?.toString() ?? "";
    const cvFile     = formData.get("cv") as File | null;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    // Build attachments array if CV was uploaded
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    if (cvFile && cvFile.size > 0) {
      const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: cvFile.name,
        content: cvBuffer,
        contentType: cvFile.type || "application/pdf",
      });
    }

    // Gmail SMTP transporter using App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to MadSphere team
    await transporter.sendMail({
      from: `"MadSphere Careers" <${process.env.GMAIL_USER}>`,
      to: "madsphere.info@gmail.com",
      replyTo: email,
      subject: `New Application — ${role || "Open Role"} — ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
          <div style="border-left: 4px solid #0047FF; padding-left: 20px; margin-bottom: 32px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #111;">New Job Application</h1>
            <p style="margin: 4px 0 0; color: #555; font-size: 14px;">${role || "General Inquiry"}</p>
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
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Role</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111;">${role || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Portfolio</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">
                ${portfolio ? `<a href="${portfolio}" style="color: #0047FF;">${portfolio}</a>` : "—"}
              </td>
            </tr>
          </table>

          <div style="margin-top: 28px; background: #f8f8f8; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          ${cvFile && cvFile.size > 0 ? `
          <div style="margin-top: 16px; background: #eef3ff; border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">📎</span>
            <div>
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0047FF;">CV Attached</p>
              <p style="margin: 0; font-size: 12px; color: #555;">${cvFile.name}</p>
            </div>
          </div>
          ` : ""}

          <p style="margin-top: 32px; font-size: 12px; color: #aaa; text-align: center;">Sent via MadSphere Careers · madsphere.info@gmail.com</p>
        </div>
      `,
      attachments,
    });

    // Auto-reply to applicant
    await transporter.sendMail({
      from: `"MadSphere Studio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We got your application, ${name.split(" ")[0]}. 👋`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff;">
          <h1 style="font-size: 26px; font-weight: 800; color: #111; margin-bottom: 8px;">Hey ${name.split(" ")[0]}, we got it.</h1>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px;">
            Thanks for applying for the <strong>${role || "role"}</strong> at MadSphere. We've received your application and we'll review it carefully.
          </p>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px;">
            If we think there's a good fit, we'll reach out to you on this email within a week. In the meantime, feel free to check out our work.
          </p>
          <a href="https://madsphere.xyz" style="display: inline-block; background: #0047FF; color: white; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; padding: 14px 28px; border-radius: 100px; text-decoration: none;">See Our Work →</a>
          <p style="margin-top: 40px; font-size: 12px; color: #aaa;">MadSphere Studio · Mumbai</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/apply] Error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
