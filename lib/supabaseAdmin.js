import { createClient } from "@supabase/supabase-js";

// SUPABASE_SERVICE_ROLE_KEY must never have the NEXT_PUBLIC_ prefix — that
// prefix would bundle it into client-side JS and anyone could read your
// database directly. This client is only ever imported inside app/api/*
// route handlers, which run on the server.
let client = null;

export function supabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });

  return client;
}
