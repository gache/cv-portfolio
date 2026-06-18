import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  return ADMIN_SECRET && secret === ADMIN_SECRET;
}

// GET /api/admin/testimonials?secret=xxx — list all approved
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  const items = await kv.lrange("approved_testimonials", 0, -1);
  return NextResponse.json({ count: items.length, items });
}

// DELETE /api/admin/testimonials?secret=xxx&index=0 — delete by index
// DELETE /api/admin/testimonials?secret=xxx&all=true — clear all
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const all = req.nextUrl.searchParams.get("all");
  if (all === "true") {
    await kv.del("approved_testimonials");
    return NextResponse.json({ ok: true, deleted: "all" });
  }

  const indexParam = req.nextUrl.searchParams.get("index");
  const index = parseInt(indexParam ?? "", 10);
  if (isNaN(index)) {
    return NextResponse.json({ error: "Provide ?index=N or ?all=true" }, { status: 400 });
  }

  // Redis LSET to a sentinel, then LREM to remove it
  const sentinel = "__deleted__";
  await kv.lset("approved_testimonials", index, sentinel);
  await kv.lrem("approved_testimonials", 1, sentinel);

  return NextResponse.json({ ok: true, deleted: index });
}
