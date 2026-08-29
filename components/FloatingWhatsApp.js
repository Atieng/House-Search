import WhatsAppIcon from "./WhatsAppIcon";
import { AGENCY, toWhatsAppHref } from "../data/properties";

export default function FloatingWhatsApp() {
  return (
    <a
      href={toWhatsAppHref(AGENCY.whatsappPhone, "Hi, I'd like some help finding a house through House Search.")}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={28} color="#fff" />
    </a>
  );
}
