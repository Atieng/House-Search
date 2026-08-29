import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { listingId, phone, mpesaCode } = body || {};

  if (!listingId || !phone || !mpesaCode) {
    return NextResponse.json(
      { error: "listingId, phone and mpesaCode are all required." },
      { status: 400 }
    );
  }

  const cleanCode = String(mpesaCode).trim().toUpperCase();
  if (cleanCode.length < 6) {
    return NextResponse.json(
      { error: "That doesn't look like a valid M-Pesa code." },
      { status: 400 }
    );
  }

  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("unlock_submissions")
    .insert({
      listing_id: Number(listingId),
      phone: String(phone).trim(),
      mpesa_code: cleanCode,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("unlock/submit error:", error);
    return NextResponse.json({ error: "Could not save your submission." }, { status: 500 });
  }

  return NextResponse.json({ submissionId: data.id, status: "pending" });
}
