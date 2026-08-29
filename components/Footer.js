import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { AGENCY, toTelHref, toWhatsAppHref } from "../data/properties";

export default function Footer() {
  const waMessage = "Hi, I'd like some help finding a house through House Search.";

  return (
    <footer id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <Logo showWordmark={false} size={30} />
              House Search
            </div>
            <p className="desc">
              Find a house across Juja, Kimbo, K-Road and Gate A, B &amp; C.
              Updated by local landlords every week. Every listing connects
              you straight to the landlord — no middlemen.
            </p>
            <div className="footer-cta">
              <a href={toTelHref(AGENCY.phone)} className="btn btn-ghost btn-sm" style={{ borderColor: "rgba(255,255,255,.25)", color: "#fff" }}>
                📞 Call us
              </a>
              <a
                href={toWhatsAppHref(AGENCY.whatsappPhone, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <WhatsAppIcon size={15} /> WhatsApp us
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#listings">All Listings</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#request">Can&apos;t Find It?</a></li>
            </ul>
          </div>

          <div>
            <h4>For Landlords</h4>
            <ul>
              <li><a href="#landlords">List a House</a></li>
              <li><a href={toWhatsAppHref(AGENCY.whatsappPhone, "Hi, I'd like to list a house on House Search.")} target="_blank" rel="noopener noreferrer">Message us to list</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={toTelHref(AGENCY.phone)}>📞 {AGENCY.phone}</a>
              </li>
              <li>
                <a href={toWhatsAppHref(AGENCY.whatsappPhone, waMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} /> Chat on WhatsApp
                </a>
              </li>
              <li>
                <span>📍 {AGENCY.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} House Search™ · Terms of Service · Privacy Policy</span>
          <div className="socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="Twitter">tw</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
