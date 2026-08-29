"use client";

import { useEffect } from "react";
import { toTelHref, toWhatsAppHref } from "../data/properties";
import WhatsAppIcon from "./WhatsAppIcon";
import HeartIcon from "./HeartIcon";
import UnlockCard from "./UnlockCard";
import PropertyGallery from "./PropertyGallery";

export default function PropertyModal({ property, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!property) return null;

  const waMessage = `Hi, I'm interested in the ${property.title} in ${property.area} (KSh ${property.rent.toLocaleString()}/mo) — I saw it on House Search. Could you tell me more, and is it still available?`;
  const initials = property.landlord.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const favorited = isFavorite(property.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <PropertyGallery images={property.images} title={property.title} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span className="badge" style={{ marginBottom: 0 }}>{property.status}</span>
          <button
            className={`fav-btn-inline${favorited ? " is-fav" : ""}`}
            aria-label={favorited ? "Remove from saved" : "Save this listing"}
            aria-pressed={favorited}
            onClick={() => onToggleFavorite(property.id)}
          >
            <HeartIcon size={16} filled={favorited} color={favorited ? "#E2483B" : "var(--navy)"} />
            {favorited ? "Saved" : "Save"}
          </button>
        </div>
        <h3 style={{ marginTop: 8 }}>{property.title}</h3>
        <div className="card-meta">
          {property.location_detail.specific} · {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bd`} · {property.bathrooms} ba
        </div>
        <div className="views-count" style={{ marginTop: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {property.views.toLocaleString()} views
        </div>
        <div className="card-rent" style={{ marginTop: 10 }}>
          KSh {property.rent.toLocaleString()} <span>/ month</span>
        </div>
        <p className="desc">{property.description}</p>

        <UnlockCard property={property} />

        <div className="contact-box">
          <div className="contact-avatar">{initials}</div>
          <div>
            <strong style={{ color: "var(--navy)", fontSize: 14.5 }}>
              {property.landlord.name}
              {property.landlord.verified && <span className="verified-badge">✓ Verified</span>}
            </strong>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
              Prefers: {property.landlord.preferred} · Viewing: {property.landlord.viewingHours}
            </div>
          </div>
        </div>

        <div className="contact-actions">
          <a href={toTelHref(property.landlord.phone)} className="btn btn-primary">
            📞 Call {property.landlord.phone}
          </a>
          <a
            href={toWhatsAppHref(property.landlord.phone, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon size={17} /> Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
