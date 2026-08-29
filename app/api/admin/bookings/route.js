import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { requireAdmin } from "../../../../lib/requireAdmin";

export async function GET(request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // optional filter: pending | confirmed | cancelled

  const supabase = supabaseAdmin();
  let query = supabase
    .from("bookings")
    .select("id, listing_id, submission_id, name, phone, preferred_date, preferred_time, notes, status, created_at")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    console.error("admin/bookings GET error:", error);
    return NextResponse.json({ error: "Could not load bookings." }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
