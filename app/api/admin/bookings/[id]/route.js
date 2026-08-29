import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { requireAdmin } from "../../../../../lib/requireAdmin";

export async function POST(request, { params }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { action } = body || {};
  if (!["confirm", "cancel"].includes(action)) {
    return NextResponse.json({ error: "action must be 'confirm' or 'cancel'." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: action === "confirm" ? "confirmed" : "cancelled" })
    .eq("id", params.id)
    .select("id, status")
    .single();

  if (error || !data) {
    console.error("admin/bookings/[id] POST error:", error);
    return NextResponse.json({ error: "Could not update booking." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, status: data.status });
}
