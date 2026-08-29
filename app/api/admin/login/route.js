import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  createSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE_SECONDS,
} from "../../../../lib/adminAuth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { username, password } = body || {};

  let ok = false;
  try {
    ok = checkAdminCredentials(username || "", password || "");
  } catch (e) {
    console.error("admin login config error:", e);
    return NextResponse.json({ error: "Server is not configured for admin login." }, { status: 500 });
  }

  if (!ok) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });
  return res;
}
