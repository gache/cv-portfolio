import { Resend } from "resend";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 messages per IP per hour
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
    const { success } = await ratelimit.limit(`contact:${ip}`);
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, company, message } = body;

    // Type + presence validation
    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof message !== "string" || !message.trim()
    ) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Length limits
    if (name.length > 200 || email.length > 200 || message.length > 5000 || (company && company.length > 200)) {
      return NextResponse.json({ error: "Contenu trop long" }, { status: 400 });
    }

    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safeCompany = escapeHtml((company || "").trim());
    const safeMessage = escapeHtml(message.trim());

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "erickfrancodelgado@hotmail.com",
      replyTo: email.trim(),
      subject: `[Portfolio] Message de ${safeName}${safeCompany ? ` — ${safeCompany}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#818CF8;margin-bottom:4px">Nouveau message depuis ton portfolio</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Nom</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#818CF8">${safeEmail}</a></td></tr>
            ${safeCompany ? `<tr><td style="padding:8px 0;color:#6b7280">Entreprise</td><td style="padding:8px 0">${safeCompany}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#374151;line-height:1.6;white-space:pre-wrap">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
