import { NextResponse } from "next/server";
import { isValidSessionToken, ADMIN_COOKIE_NAME } from "./adminAuth";

// Returns null if the request is authenticated as admin, otherwise an
// unauthorized NextResponse to return immediately from the route handler.
export function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  return null;
}
