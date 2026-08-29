import crypto from "crypto";

const COOKIE_NAME = "hs_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  return s;
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

// Builds a cookie value like "<expiryTimestamp>.<hmacSignature>" — no
// server-side session storage needed, and it can't be forged without
// ADMIN_SESSION_SECRET.
export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = sign(payload);
  const validSig =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!validSig) return false;
  return Number(payload) > Date.now();
}

export function checkAdminCredentials(username, password) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) {
    throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD environment variables.");
  }
  return username === validUser && password === validPass;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
