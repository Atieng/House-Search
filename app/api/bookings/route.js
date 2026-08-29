import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { listingId, submissionId, name, phone, preferredDate, preferredTime, notes } = body || {};

  if (!listingId || !submissionId || !name || !phone || !preferredDate || !preferredTime) {
    return NextResponse.json(
      { error: "listingId, submissionId, name, phone, preferredDate and preferredTime are required." },
      { status: 400 }
    );
  }

  const supabase = supabaseAdmin();

  // Only allow booking off the back of an approved unlock for this listing.
  const { data: submission, error: subError } = await supabase
    .from("unlock_submissions")
    .select("id, listing_id, status")
    .eq("id", submissionId)
    .single();

  if (subError || !submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  if (submission.listing_id !== Number(listingId) || submission.status !== "approved") {
    return NextResponse.json(
      { error: "You need an approved location unlock for this listing before booking a viewing." },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      listing_id: Number(listingId),
      submission_id: submissionId,
      name: String(name).trim(),
      phone: String(phone).trim(),
      preferred_date: preferredDate,
      preferred_time: String(preferredTime).trim(),
      notes: notes ? String(notes).trim() : null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("bookings POST error:", error);
    return NextResponse.json({ error: "Could not save your booking." }, { status: 500 });
  }

  return NextResponse.json({ bookingId: data.id, status: "pending" });
}
