import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  if (!token || !["approve", "reject"].includes(action ?? "")) {
    return new NextResponse(html("Lien invalide", "Ce lien est invalide ou expiré.", "#f87171"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const testimonial = await kv.get<{
    name: string; role: string; company: string; text: string;
  }>(`pending:${token}`);

  if (!testimonial) {
    return new NextResponse(html("Déjà traité", "Ce témoignage a déjà été approuvé ou rejeté.", "#f59e0b"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (action === "approve") {
    // Add to approved list
    await kv.lpush("approved_testimonials", {
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      text: testimonial.text,
    });
    await kv.del(`pending:${token}`);
    return new NextResponse(
      html("✓ Approuvé !", `Le témoignage de <strong>${testimonial.name}</strong> est maintenant visible sur le site.`, "#4ADE80"),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Reject
  await kv.del(`pending:${token}`);
  return new NextResponse(
    html("Rejeté", `Le témoignage de <strong>${testimonial.name}</strong> a été supprimé.`, "#a1a1aa"),
    { headers: { "Content-Type": "text/html" } }
  );
}

function html(title: string, message: string, color: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#09090B;color:#FAFAFA">
  <div style="text-align:center;padding:48px;max-width:480px">
    <div style="font-size:48px;margin-bottom:16px">${title.startsWith("✓") ? "✓" : title === "Rejeté" ? "✕" : "⚠"}</div>
    <h1 style="color:${color};margin-bottom:8px">${title}</h1>
    <p style="color:#a1a1aa;line-height:1.6">${message}</p>
    <a href="https://erickfranco.fr" style="display:inline-block;margin-top:24px;padding:10px 20px;background:#818CF8;color:#000;text-decoration:none;border-radius:8px;font-weight:600">
      Retour au site
    </a>
  </div>
</body>
</html>`;
}
