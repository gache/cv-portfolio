import { Resend } from "resend";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, role, company, text } = await req.json();

    if (!name || !role || !text) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const token = randomUUID();
    const testimonial = { name, role, company: company || "", text, token, createdAt: Date.now() };

    // Save as pending in KV
    await kv.set(`pending:${token}`, testimonial, { ex: 60 * 60 * 24 * 30 }); // 30 days

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://erickfranco.fr";
    const approveUrl = `${baseUrl}/api/moderation?token=${token}&action=approve`;
    const rejectUrl = `${baseUrl}/api/moderation?token=${token}&action=reject`;

    await resend.emails.send({
      from: "Portfolio Témoignage <onboarding@resend.dev>",
      to: "erickfrancodelgado@hotmail.com",
      subject: `[Témoignage à approuver] ${name} — ${role}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#818CF8">Nouveau témoignage en attente</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Poste</td><td style="padding:8px 0">${role}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#6b7280">Entreprise</td><td style="padding:8px 0">${company}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#374151;font-style:italic;font-size:16px;line-height:1.8">"${text}"</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <div style="display:flex;gap:12px;margin-top:24px">
            <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#4ADE80;color:#000;text-decoration:none;border-radius:8px;font-weight:600">
              ✓ Approuver
            </a>
            <a href="${rejectUrl}" style="display:inline-block;padding:12px 24px;background:#f87171;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">
              ✕ Rejeter
            </a>
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
