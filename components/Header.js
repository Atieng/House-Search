"use client";

import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="nav wrap">
        <a href="#top" aria-label="House Search home">
          <Logo />
        </a>
        <nav className="nav-links">
          <a href="#request">📝 Can&apos;t Find It?</a>
          <a href="#landlords">🏠 List a House</a>
          <a href="#how-it-works">🧭 How It Works</a>
          <a href="#contact">📞 Contact</a>
        </nav>
        <div className="nav-right">
          <a href="#listings" className="btn btn-primary">
            Start Searching
          </a>
          <button
            className="hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="wrap" style={{ paddingBottom: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="#request" onClick={() => setMenuOpen(false)}>📝 Can&apos;t Find It?</a>
          <a href="#landlords" onClick={() => setMenuOpen(false)}>🏠 List a House</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>🧭 How It Works</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>📞 Contact</a>
        </div>
      )}
    </header>
  );
}
