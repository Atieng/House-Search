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
  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "action must be 'approve' or 'reject'." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("unlock_submissions")
    .update({
      status: action === "approve" ? "approved" : "rejected",
      decided_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select("id, status")
    .single();

  if (error || !data) {
    console.error("admin/submissions/[id] POST error:", error);
    return NextResponse.json({ error: "Could not update submission." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, status: data.status });
}
