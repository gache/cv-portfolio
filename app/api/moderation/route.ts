import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Testimonial = { name: string; role: string; company: string; text: string };

async function getTestimonial(token: string) {
  return kv.get<Testimonial>(`pending:${token}`);
}

// GET — show confirmation page (no state change)
export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const { success } = await ratelimit.limit(`moderation:${ip}`);
  if (!success) {
    return new NextResponse(result("Trop de requêtes", "Réessayez plus tard.", "#f87171"), {
      status: 429, headers: { "Content-Type": "text/html" },
    });
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  if (!token || !["approve", "reject"].includes(action ?? "")) {
    return new NextResponse(result("Lien invalide", "Ce lien est invalide ou expiré.", "#f87171"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const testimonial = await getTestimonial(token);
  if (!testimonial) {
    return new NextResponse(result("Déjà traité", "Ce témoignage a déjà été approuvé ou rejeté.", "#f59e0b"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const safeName = escapeHtml(testimonial.name);
  const safeRole = escapeHtml(testimonial.role);
  const isApprove = action === "approve";

  return new NextResponse(
    confirmPage({ token, action: action!, safeName, safeRole, isApprove }),
    { headers: { "Content-Type": "text/html" } }
  );
}

// POST — execute approve/reject after admin confirmation
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const { success } = await ratelimit.limit(`moderation:${ip}`);
  if (!success) {
    return new NextResponse(result("Trop de requêtes", "Réessayez plus tard.", "#f87171"), {
      status: 429, headers: { "Content-Type": "text/html" },
    });
  }

  let token: string | null = null;
  let action: string | null = null;

  try {
    const form = await req.formData();
    token = form.get("token") as string | null;
    action = form.get("action") as string | null;
  } catch {
    return new NextResponse(result("Erreur", "Requête invalide.", "#f87171"), {
      status: 400, headers: { "Content-Type": "text/html" },
    });
  }

  if (!token || !["approve", "reject"].includes(action ?? "")) {
    return new NextResponse(result("Lien invalide", "Paramètres manquants ou invalides.", "#f87171"), {
      status: 400, headers: { "Content-Type": "text/html" },
    });
  }

  const testimonial = await getTestimonial(token);
  if (!testimonial) {
    return new NextResponse(result("Déjà traité", "Ce témoignage a déjà été approuvé ou rejeté.", "#f59e0b"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const safeName = escapeHtml(testimonial.name);

  if (action === "approve") {
    const pipe = kv.pipeline();
    pipe.lpush("approved_testimonials", {
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      text: testimonial.text,
    });
    pipe.del(`pending:${token}`);
    await pipe.exec();

    return new NextResponse(
      result("✓ Approuvé !", `Le témoignage de <strong>${safeName}</strong> est maintenant visible sur le site.`, "#4ADE80"),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  await kv.del(`pending:${token}`);
  return new NextResponse(
    result("Rejeté", `Le témoignage de <strong>${safeName}</strong> a été supprimé.`, "#a1a1aa"),
    { headers: { "Content-Type": "text/html" } }
  );
}

function confirmPage({ token, action, safeName, safeRole, isApprove }: {
  token: string; action: string; safeName: string; safeRole: string; isApprove: boolean;
}) {
  const color = isApprove ? "#4ADE80" : "#f87171";
  const label = isApprove ? "✓ Approuver" : "✕ Rejeter";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Confirmer l'action</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#09090B;color:#FAFAFA">
  <div style="text-align:center;padding:48px;max-width:480px">
    <h1 style="color:${color};margin-bottom:8px">Confirmer l'action</h1>
    <p style="color:#a1a1aa;margin-bottom:4px">Auteur : <strong style="color:#FAFAFA">${safeName}</strong></p>
    <p style="color:#a1a1aa;margin-bottom:24px">Poste : ${safeRole}</p>
    <form method="POST" action="/api/moderation" style="display:inline-flex;gap:12px;flex-wrap:wrap;justify-content:center">
      <input type="hidden" name="token" value="${escapeHtml(token)}">
      <input type="hidden" name="action" value="${escapeHtml(action)}">
      <button type="submit" style="padding:12px 28px;background:${color};color:#000;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:15px">${label}</button>
      <a href="https://cv-portfolio-dusky.vercel.app" style="display:inline-block;padding:12px 24px;background:#27272A;color:#FAFAFA;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px">Annuler</a>
    </form>
  </div>
</body>
</html>`;
}

function result(title: string, message: string, color: string) {
  const icon = title.startsWith("✓") ? "✓" : title === "Rejeté" ? "✕" : "⚠";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#09090B;color:#FAFAFA">
  <div style="text-align:center;padding:48px;max-width:480px">
    <div style="font-size:48px;margin-bottom:16px">${icon}</div>
    <h1 style="color:${color};margin-bottom:8px">${title}</h1>
    <p style="color:#a1a1aa;line-height:1.6">${message}</p>
    <a href="https://cv-portfolio-dusky.vercel.app" style="display:inline-block;margin-top:24px;padding:10px 20px;background:#818CF8;color:#000;text-decoration:none;border-radius:8px;font-weight:600">Retour au site</a>
  </div>
</body>
</html>`;
}
