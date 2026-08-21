import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    // Server-side validation
    const errors: Record<string, string> = {};

    if (!body.name || body.name.trim().length === 0) {
      errors.name = "Name is required.";
    } else if (body.name.trim().length > 200) {
      errors.name = "Name is too long.";
    }

    if (!body.email || body.email.trim().length === 0) {
      errors.email = "Email is required.";
    } else if (!validateEmail(body.email.trim())) {
      errors.email = "Please provide a valid email address.";
    }

    if (!body.subject || body.subject.trim().length === 0) {
      errors.subject = "Subject is required.";
    } else if (body.subject.trim().length > 500) {
      errors.subject = "Subject is too long.";
    }

    if (!body.message || body.message.trim().length === 0) {
      errors.message = "Message is required.";
    } else if (body.message.trim().length > 5000) {
      errors.message = "Message is too long (max 5000 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          serviceUnavailable: true,
          message: "Contact service is not configured yet. Please reach out directly via email.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const recipient = process.env.CONTACT_TO_EMAIL || "sainimal1ba@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipient],
      replyTo: body.email.trim(),
      subject: `[Portfolio] ${body.subject.trim()} — ${body.name.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111; line-height: 1.6;">
          <h2 style="color: #0284c7; margin-bottom: 20px; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px;">
            New Portfolio Message
          </h2>
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <p style="margin: 6px 0;"><strong>Sender Name:</strong> ${escapeHtml(body.name.trim())}</p>
            <p style="margin: 6px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(body.email.trim())}" style="color: #0284c7;">${escapeHtml(body.email.trim())}</a></p>
            <p style="margin: 6px 0;"><strong>Subject:</strong> ${escapeHtml(body.subject.trim())}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message Content:</h3>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 15px; color: #1e293b;">
${escapeHtml(body.message.trim())}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">
            Sent from your portfolio website at ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Failed to send email. Please try direct email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Unexpected contact error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
