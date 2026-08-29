import { cookies } from "next/headers";
import { isValidSessionToken, ADMIN_COOKIE_NAME } from "../../lib/adminAuth";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export const metadata = { title: "Admin — House Search" };

export default function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const authed = isValidSessionToken(token);

  return (
    <div style={{ minHeight: "100vh", background: "var(--sky)" }}>
      {authed ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
}
