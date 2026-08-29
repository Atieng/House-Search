"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Could not reach the server.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 34,
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 20px 40px -20px rgba(11,36,71,.25)",
        }}
      >
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--navy)", fontSize: 22, marginBottom: 6 }}>
          Admin login
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 22 }}>
          House Search — unlock &amp; booking approvals
        </p>

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          autoComplete="username"
          required
        />

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", margin: "16px 0 6px" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          autoComplete="current-password"
          required
        />

        {error && (
          <p style={{ color: "var(--red)", fontSize: 13, marginTop: 14 }}>{error}</p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 13px",
  borderRadius: 10,
  border: "1.5px solid var(--line)",
  fontSize: 14.5,
  fontFamily: "inherit",
};
