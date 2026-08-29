"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import PropertyModal from "../components/PropertyModal";
import { properties, AGENCY, toWhatsAppHref } from "../data/properties";
import WhatsAppIcon from "../components/WhatsAppIcon";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import useFavorites from "../hooks/useFavorites";

export default function Home() {
  const [active, setActive] = useState(null);
  const [areaFilter, setAreaFilter] = useState("All");
  const { toggleFavorite, isFavorite, favorites } = useFavorites();

  const areas = ["All", ...Array.from(new Set(properties.map((p) => p.area)))];
  const visible =
    areaFilter === "All" ? properties : properties.filter((p) => p.area === areaFilter);

  return (
    <div id="top">
      <Header />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              Updated weekly by local landlords
            </div>
            <h1>
              Find your next <span className="u">home</span> near JKUAT
            </h1>
            <p className="lead">
              Browse bedsitters and houses across Juja, Kimbo, K-Road and Gate
              A, B &amp; C — then call or WhatsApp the landlord directly.
            </p>
            <div className="hero-cta">
              <a href="#listings" className="btn btn-primary">
                Start Searching
              </a>
              <a
                href={toWhatsAppHref(AGENCY.whatsappPhone, "Hi, I'm looking for a house near JKUAT.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon size={16} /> Chat with us
              </a>
            </div>
          </div>
          <div className="hero-art">
            <span style={{ fontSize: 56 }}>🏠</span>
          </div>
        </div>
      </section>

      <section id="listings">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Available Listings</h2>
              <p className="listings-note">
                Click any listing for full details, or contact the landlord
                straight away.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {areas.map((a) => (
                <button
                  key={a}
                  onClick={() => setAreaFilter(a)}
                  className={a === areaFilter ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {visible.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onOpen={setActive}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ background: "var(--sky)" }}>
        <div className="wrap">
          <div className="section-head">
            <h2>How It Works</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))" }}>
            <div className="card" style={{ padding: 22, cursor: "default" }}>
              <h3 style={{ marginBottom: 8 }}>1. Browse listings</h3>
              <p style={{ color: "var(--muted)", fontSize: 14.5 }}>
                Filter by area and see rent, size and photos for each house.
              </p>
            </div>
            <div className="card" style={{ padding: 22, cursor: "default" }}>
              <h3 style={{ marginBottom: 8 }}>2. Check the details</h3>
              <p style={{ color: "var(--muted)", fontSize: 14.5 }}>
                Open a listing for the full description and landlord contact.
              </p>
            </div>
            <div className="card" style={{ padding: 22, cursor: "default" }}>
              <h3 style={{ marginBottom: 8 }}>3. Call or WhatsApp</h3>
              <p style={{ color: "var(--muted)", fontSize: 14.5 }}>
                Reach the landlord directly to ask questions or book a viewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="landlords">
        <div className="wrap">
          <div
            style={{
              background: "linear-gradient(120deg, var(--navy) 0%, #0f3a75 60%, var(--blue) 130%)",
              borderRadius: 26,
              padding: 44,
              color: "#fff",
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ marginBottom: 10 }}>List your house with us</h2>
              <p style={{ color: "#c7d6f2", maxWidth: 420, fontSize: 14, lineHeight: 1.6 }}>
                Message us on WhatsApp with your listing details and photos —
                we&apos;ll get it live for tenants to find.
              </p>
            </div>
            <a
              href={toWhatsAppHref(AGENCY.whatsappPhone, "Hi, I'd like to list a house on House Search.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon size={16} /> List a House
            </a>
          </div>
        </div>
      </section>

      <section id="request">
        <div className="wrap">
          <div className="section-head">
            <h2>Can&apos;t find what you need?</h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 420, marginBottom: 20 }}>
            Tell us your area, budget and house type on WhatsApp — we&apos;ll
            let you know the moment a match goes up.
          </p>
          <a
            href={toWhatsAppHref(AGENCY.whatsappPhone, "Hi, I couldn't find what I'm looking for. My budget is __ and I'm looking for a __ near __.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon size={16} /> Send us your request
          </a>
        </div>
      </section>

      <Footer />

      <PropertyModal
        property={active}
        onClose={() => setActive(null)}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <FloatingWhatsApp />
    </div>
  );
}
