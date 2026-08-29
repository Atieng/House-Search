import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export async function GET(request, { params }) {
  const listingId = Number(params.id);
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get("submissionId");

  if (!listingId || !submissionId) {
    return NextResponse.json({ error: "Missing listing id or submissionId." }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  // Confirm this specific submission was approved for this specific listing.
  const { data: submission, error: subError } = await supabase
    .from("unlock_submissions")
    .select("id, listing_id, status")
    .eq("id", submissionId)
    .single();

  if (subError || !submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  if (submission.listing_id !== listingId) {
    return NextResponse.json({ error: "Submission does not match this listing." }, { status: 403 });
  }

  if (submission.status !== "approved") {
    return NextResponse.json({ error: "Not approved yet.", status: submission.status }, { status: 403 });
  }

  const { data: location, error: locError } = await supabase
    .from("listing_locations")
    .select("exact_location")
    .eq("listing_id", listingId)
    .single();

  if (locError || !location) {
    return NextResponse.json(
      { error: "Location not set for this listing yet — contact the site owner." },
      { status: 404 }
    );
  }

  return NextResponse.json({ exactLocation: location.exact_location });
}
