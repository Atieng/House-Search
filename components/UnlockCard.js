"use client";

import { useEffect, useRef, useState } from "react";
import { AGENCY } from "../data/properties";

const POLL_MS = 5000;
const UNLOCK_PRICE = 300;

function storageKey(listingId) {
  return `house-search:unlock:${listingId}`;
}

function loadSaved(listingId) {
  try {
    const raw = window.localStorage.getItem(storageKey(listingId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(listingId, state) {
  try {
    window.localStorage.setItem(storageKey(listingId), JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function UnlockCard({ property }) {
  const [saved, setSaved] = useState(null); // { submissionId, status }
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [exactLocation, setExactLocation] = useState(null);
  const pollRef = useRef(null);

  // Load any prior submission for this listing from this browser.
  useEffect(() => {
    const existing = loadSaved(property.id);
    if (existing) setSaved(existing);
  }, [property.id]);

  // Poll for status while pending.
  useEffect(() => {
    if (!saved?.submissionId || saved.status !== "pending") return;

    async function poll() {
      try {
        const res = await fetch(`/api/unlock/status?id=${saved.submissionId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status && data.status !== saved.status) {
          const next = { ...saved, status: data.status };
          setSaved(next);
          saveState(property.id, next);
        }
      } catch {
        // ignore, try again next tick
      }
    }

    poll();
    pollRef.current = setInterval(poll, POLL_MS);
    return () => clearInterval(pollRef.current);
  }, [saved, property.id]);

  // Fetch the exact location once approved.
  useEffect(() => {
    if (saved?.status !== "approved" || exactLocation) return;
    (async () => {
      try {
        const res = await fetch(`/api/listings/${property.id}/location?submissionId=${saved.submissionId}`);
        if (res.ok) {
          const data = await res.json();
          setExactLocation(data.exactLocation);
        }
      } catch {
        // ignore
      }
    })();
  }, [saved, property.id, exactLocation]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!phone.trim() || !code.trim()) {
      setError("Enter both your phone number and the M-Pesa code.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/unlock/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: property.id, phone, mpesaCode: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      const next = { submissionId: data.submissionId, status: "pending" };
      setSaved(next);
      saveState(property.id, next);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetToRetry() {
    setSaved(null);
    setCode("");
    saveState(property.id, null);
  }

  // ---- Render states ----

  if (!saved) {
    return (
      <div className="unlock-card">
        <h4>🔒 Unlock exact location</h4>
        <p>
          Send <span className="unlock-price">KSh {UNLOCK_PRICE}</span> via M-Pesa
          Send Money to <strong>{AGENCY.phone}</strong>, then enter your details
          below so we can confirm it and reveal the exact address.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="unlock-field">
            <label htmlFor="unlock-phone">Your phone number</label>
            <input
              id="unlock-phone"
              type="tel"
              placeholder="07xx xxx xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="unlock-field">
            <label htmlFor="unlock-code">M-Pesa confirmation code</label>
            <input
              id="unlock-code"
              type="text"
              placeholder="e.g. QCI7ABCDE"
              style={{ textTransform: "uppercase" }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            {submitting ? "Submitting…" : "Submit for review"}
          </button>
        </form>
      </div>
    );
  }

  if (saved.status === "pending") {
    return (
      <div className="unlock-card">
        <h4>🔒 Unlock exact location</h4>
        <div className="unlock-status pending">
          <span className="spinner" /> Waiting for confirmation…
        </div>
        <p style={{ marginTop: 10 }}>
          We&apos;re checking your M-Pesa code against our records. This usually
          takes a few minutes during business hours — this page updates
          automatically once it&apos;s confirmed.
        </p>
      </div>
    );
  }

  if (saved.status === "rejected") {
    return (
      <div className="unlock-card">
        <h4>🔒 Unlock exact location</h4>
        <div className="unlock-status rejected">✕ Couldn&apos;t confirm that payment</div>
        <p style={{ marginTop: 10 }}>
          We couldn&apos;t match that code to a payment. Double-check the code and
          try again, or contact us directly if you think this is a mistake.
        </p>
        <button onClick={resetToRetry} className="btn btn-ghost btn-sm">Try again</button>
      </div>
    );
  }

  // approved
  return (
    <div className="unlock-card">
      <h4>🔓 Exact location</h4>
      <div className="unlock-status approved">✓ Payment confirmed</div>
      {exactLocation ? (
        <div className="exact-location-box">
          <strong>Exact location</strong>
          <p>{exactLocation}</p>
        </div>
      ) : (
        <p style={{ marginTop: 10 }}>Loading the address…</p>
      )}
      <BookingForm property={property} submissionId={saved.submissionId} />
    </div>
  );
}

function BookingForm({ property, submissionId }) {
  const bookingKey = `house-search:booking:${property.id}`;
  const [existingBooking, setExistingBooking] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(bookingKey);
      if (raw) setExistingBooking(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [bookingKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !date || !time.trim()) {
      setError("Please fill in your name, phone, preferred date and time.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: property.id,
          submissionId,
          name,
          phone,
          preferredDate: date,
          preferredTime: time,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      const record = { bookingId: data.bookingId, date, time };
      setExistingBooking(record);
      try {
        window.localStorage.setItem(bookingKey, JSON.stringify(record));
      } catch {
        // ignore
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (existingBooking) {
    return (
      <div style={{ marginTop: 16 }}>
        <h4 style={{ marginBottom: 6 }}>📅 Viewing requested</h4>
        <p style={{ margin: 0 }}>
          You asked to view this on <strong>{existingBooking.date}</strong> at{" "}
          <strong>{existingBooking.time}</strong>. We&apos;ll call or WhatsApp you to confirm.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h4 style={{ marginBottom: 6 }}>📅 Book a viewing</h4>
      <form onSubmit={handleSubmit}>
        <div className="unlock-field">
          <label htmlFor="booking-name">Your name</label>
          <input id="booking-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="unlock-field">
          <label htmlFor="booking-phone">Phone number</label>
          <input id="booking-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="unlock-field" style={{ flex: 1 }}>
            <label htmlFor="booking-date">Preferred date</label>
            <input id="booking-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="unlock-field" style={{ flex: 1 }}>
            <label htmlFor="booking-time">Preferred time</label>
            <input id="booking-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>
        <div className="unlock-field">
          <label htmlFor="booking-notes">Notes (optional)</label>
          <input id="booking-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          {submitting ? "Requesting…" : "Request viewing"}
        </button>
      </form>
    </div>
  );
}
