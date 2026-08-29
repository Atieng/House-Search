"use client";

import { useCallback, useEffect, useState } from "react";
import { properties } from "../../data/properties";

const REFRESH_MS = 8000;

function listingTitle(id) {
  const p = properties.find((x) => x.id === id);
  return p ? p.title : `Listing #${id}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("submissions");
  const [submissions, setSubmissions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      const [subRes, bookRes] = await Promise.all([
        fetch("/api/admin/submissions"),
        fetch("/api/admin/bookings"),
      ]);
      if (subRes.ok) setSubmissions((await subRes.json()).submissions || []);
      if (bookRes.ok) setBookings((await bookRes.json()).bookings || []);
    } catch {
      // silent — will retry on next interval
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function decideSubmission(id, action) {
    setBusyId(id);
    try {
      await fetch(`/api/admin/submissions/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function decideBooking(id, action) {
    setBusyId(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  const decidedSubmissions = submissions.filter((s) => s.status !== "pending");
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const decidedBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="wrap" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--navy)", fontSize: 26 }}>Admin</h1>
          <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Auto-refreshes every {REFRESH_MS / 1000}s</p>
        </div>
        <button onClick={logout} className="btn btn-ghost btn-sm">Log out</button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
        <button
          onClick={() => setTab("submissions")}
          className={tab === "submissions" ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
        >
          Unlock requests {pendingSubmissions.length > 0 && `(${pendingSubmissions.length})`}
        </button>
        <button
          onClick={() => setTab("bookings")}
          className={tab === "bookings" ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
        >
          Bookings {pendingBookings.length > 0 && `(${pendingBookings.length})`}
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading…</p>
      ) : tab === "submissions" ? (
        <>
          <Section title="Pending review">
            {pendingSubmissions.length === 0 ? (
              <Empty text="No pending unlock requests." />
            ) : (
              pendingSubmissions.map((s) => (
                <Row key={s.id}>
                  <div>
                    <strong>{listingTitle(s.listing_id)}</strong>
                    <div className="row-meta">
                      {s.phone} · code <code className="admin-code">{s.mpesa_code}</code> · {formatDate(s.created_at)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      disabled={busyId === s.id}
                      onClick={() => decideSubmission(s.id, "approve")}
                      className="btn btn-primary btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      disabled={busyId === s.id}
                      onClick={() => decideSubmission(s.id, "reject")}
                      className="btn btn-ghost btn-sm"
                      style={{ borderColor: "var(--red)", color: "var(--red)" }}
                    >
                      Reject
                    </button>
                  </div>
                </Row>
              ))
            )}
          </Section>

          <Section title="History">
            {decidedSubmissions.length === 0 ? (
              <Empty text="Nothing decided yet." />
            ) : (
              decidedSubmissions.map((s) => (
                <Row key={s.id}>
                  <div>
                    <strong>{listingTitle(s.listing_id)}</strong>
                    <div className="row-meta">
                      {s.phone} · code <code className="admin-code">{s.mpesa_code}</code> · {formatDate(s.created_at)}
                    </div>
                  </div>
                  <StatusPill status={s.status} />
                </Row>
              ))
            )}
          </Section>
        </>
      ) : (
        <>
          <Section title="Pending bookings">
            {pendingBookings.length === 0 ? (
              <Empty text="No pending bookings." />
            ) : (
              pendingBookings.map((b) => (
                <Row key={b.id}>
                  <div>
                    <strong>{listingTitle(b.listing_id)}</strong>
                    <div className="row-meta">
                      {b.name} · {b.phone} · wants {b.preferred_date} at {b.preferred_time}
                      {b.notes ? ` · "${b.notes}"` : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      disabled={busyId === b.id}
                      onClick={() => decideBooking(b.id, "confirm")}
                      className="btn btn-primary btn-sm"
                    >
                      Confirm
                    </button>
                    <button
                      disabled={busyId === b.id}
                      onClick={() => decideBooking(b.id, "cancel")}
                      className="btn btn-ghost btn-sm"
                      style={{ borderColor: "var(--red)", color: "var(--red)" }}
                    >
                      Cancel
                    </button>
                  </div>
                </Row>
              ))
            )}
          </Section>

          <Section title="History">
            {decidedBookings.length === 0 ? (
              <Empty text="Nothing decided yet." />
            ) : (
              decidedBookings.map((b) => (
                <Row key={b.id}>
                  <div>
                    <strong>{listingTitle(b.listing_id)}</strong>
                    <div className="row-meta">
                      {b.name} · {b.phone} · {b.preferred_date} at {b.preferred_time}
                    </div>
                  </div>
                  <StatusPill status={b.status} />
                </Row>
              ))
            )}
          </Section>
        </>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <h2 style={{ fontSize: 15, color: "var(--navy)", marginBottom: 10 }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

function Empty({ text }) {
  return <p style={{ color: "var(--muted)", fontSize: 13.5 }}>{text}</p>;
}

function StatusPill({ status }) {
  const colors = {
    approved: { bg: "#E6F7EE", color: "var(--green)" },
    confirmed: { bg: "#E6F7EE", color: "var(--green)" },
    rejected: { bg: "#FDEAE8", color: "var(--red)" },
    cancelled: { bg: "#FDEAE8", color: "var(--red)" },
  };
  const c = colors[status] || { bg: "var(--sky)", color: "var(--blue)" };
  return (
    <span style={{ background: c.bg, color: c.color, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>
      {status}
    </span>
  );
}
