import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { requireAdmin } from "../../../../lib/requireAdmin";

export async function GET(request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // optional filter: pending | approved | rejected

  const supabase = supabaseAdmin();
  let query = supabase
    .from("unlock_submissions")
    .select("id, listing_id, phone, mpesa_code, status, created_at, decided_at")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    console.error("admin/submissions GET error:", error);
    return NextResponse.json({ error: "Could not load submissions." }, { status: 500 });
  }

  return NextResponse.json({ submissions: data });
}
