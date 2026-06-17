import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "erickfrancodelgado@hotmail.com",
      replyTo: email,
      subject: `[Portfolio] Message de ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#818CF8;margin-bottom:4px">Nouveau message depuis ton portfolio</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#818CF8">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#6b7280">Entreprise</td><td style="padding:8px 0">${company}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#374151;line-height:1.6;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
