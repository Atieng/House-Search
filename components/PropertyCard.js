"use client";

import { useEffect, useState } from "react";
import { toTelHref, toWhatsAppHref } from "../data/properties";
import WhatsAppIcon from "./WhatsAppIcon";
import HeartIcon from "./HeartIcon";

const AUTO_ADVANCE_MS = 3500;

export default function PropertyCard({ property, onOpen, isFavorite, onToggleFavorite }) {
  const waMessage = `Hi, I'm interested in the ${property.title} (KSh ${property.rent.toLocaleString()}/mo) listed on House Search. Is it still available?`;
  const favorited = isFavorite(property.id);
  const images = property.images || [];
  const [index, setIndex] = useState(0);

  // Auto-advance the carousel when there's more than one photo.
  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  function goPrev(e) {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function goNext(e) {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="card" onClick={() => onOpen(property)}>
      <div className="card-img">
        {images.length > 0 ? (
          <img
            key={images[index].src}
            src={images[index].src}
            alt={images[index].caption || property.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span>🏠 {property.type}</span>
        )}

        {images.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={goPrev} aria-label="Previous photo">
              ‹
            </button>
            <button className="carousel-btn next" onClick={goNext} aria-label="Next photo">
              ›
            </button>
            <div className="carousel-dots" onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <span
                  key={img.src}
                  className={i === index ? "active" : ""}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}

        <button
          className={`fav-btn${favorited ? " is-fav" : ""}`}
          aria-label={favorited ? "Remove from saved" : "Save this listing"}
          aria-pressed={favorited}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
        >
          <HeartIcon size={16} filled={favorited} color={favorited ? "#E2483B" : "#0B2447"} />
        </button>
      </div>
      <div className="card-body">
        <span className="badge">{property.status}</span>
        <h3>{property.title}</h3>
        <div className="card-meta">{property.area} · {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bd`} · {property.bathrooms} ba</div>
        <div className="card-foot-row">
          <span className="views-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {property.views.toLocaleString()} views
          </span>
          <div className="card-rent">
            KSh {property.rent.toLocaleString()} <span>/ mo</span>
          </div>
        </div>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <a href={toTelHref(property.landlord.phone)} className="btn btn-ghost btn-sm">
            📞 Call
          </a>
          <a
            href={toWhatsAppHref(property.landlord.phone, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <WhatsAppIcon size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}