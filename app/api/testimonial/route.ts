import { Resend } from "resend";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 submissions per IP per hour
});

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
    const { success } = await ratelimit.limit(`testimonial:${ip}`);
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
    }

    const body = await req.json();
    const { name, role, company, text } = body;

    // Type validation
    if (
      typeof name !== "string" || !name.trim() ||
      typeof role !== "string" || !role.trim() ||
      typeof text !== "string" || !text.trim()
    ) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Length limits
    if (name.length > 200 || role.length > 200 || text.length > 2000 || (company && company.length > 200)) {
      return NextResponse.json({ error: "Contenu trop long" }, { status: 400 });
    }

    const token = randomUUID();
    const testimonial = { name, role, company: company || "", text, token, createdAt: Date.now() };

    // Fix: TTL reduced from 30 days to 72 hours
    await kv.set(`pending:${token}`, testimonial, { ex: 60 * 60 * 72 });

    const raw = (process.env.SITE_BASE_URL || process.env.VERCEL_URL || "").replace(/\/$/, "");
    const baseUrl = raw
      ? (raw.startsWith("http") ? raw : `https://${raw}`)
      : "http://localhost:3000";

    const approveUrl = `${baseUrl}/api/moderation?token=${token}&action=approve`;
    const rejectUrl  = `${baseUrl}/api/moderation?token=${token}&action=reject`;

    const safeName    = escapeHtml(name.trim());
    const safeRole    = escapeHtml(role.trim());
    const safeCompany = escapeHtml((company || "").trim());
    const safeText    = escapeHtml(text.trim());

    await resend.emails.send({
      from: "Portfolio Témoignage <onboarding@resend.dev>",
      to: "erickfrancodelgado@hotmail.com",
      subject: `[Témoignage à approuver] ${safeName} — ${safeRole}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#818CF8">Nouveau témoignage en attente</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Nom</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Poste</td><td style="padding:8px 0">${safeRole}</td></tr>
            ${safeCompany ? `<tr><td style="padding:8px 0;color:#6b7280">Entreprise</td><td style="padding:8px 0">${safeCompany}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#374151;font-style:italic;font-size:16px;line-height:1.8">"${safeText}"</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#9ca3af;font-size:12px">Lien valide 72h.</p>
          <div style="display:flex;gap:12px;margin-top:16px">
            <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#4ADE80;color:#000;text-decoration:none;border-radius:8px;font-weight:600">✓ Approuver</a>
            <a href="${rejectUrl}" style="display:inline-block;padding:12px 24px;background:#f87171;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">✕ Rejeter</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
