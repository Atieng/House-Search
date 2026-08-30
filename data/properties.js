// Central place to add/edit listings. Every field here flows into the
// listing cards and the detail view automatically.
//
// landlord.phone should be in local format (07xx xxx xxx) — it's converted
// to the international wa.me format automatically for the WhatsApp button.

export const AGENCY = {
  name: "House Search",
  phone: "0758 917 689",
  whatsappPhone: "0758917689", // used for the general "Chat on WhatsApp" CTA
  location: "Juja, Kiambu County",
};

export const properties = [
  {
    id: 12,
    images: [{ src: "/images/gate-c-bedsitter-1/1-bedroom.jpg", caption: "Bedroom" }, { src: "/images/gate-c-bedsitter-1/2-main-room.jpg", caption: "Main room" }, { src: "/images/gate-c-bedsitter-1/3-hallway.jpg", caption: "Hallway" }, { src: "/images/gate-c-bedsitter-1/4-kitchen.jpg", caption: "Kitchen sink" }],
    views: 214,
    title: "Gate C Bedsitter",
    area: "Gate C",
    type: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 8000,
    deposit: "Contact for details",
    status: "Available",
    vacancies: 4,
    furnished: false,
    size: "Contact for details",
    description:
      "Spacious self-contained bedsitter near JKUAT Gate C with its own separate kitchen counter and tiled sink area. Bright rooms with large windows, tiled floors throughout, unfurnished.",
    costs: { water: "Contact for details", electricity: "Contact for details", service: "Contact for details", garbage: "Contact for details", wifi: 0, parking: 0, other: "—" },
    amenities: ["water", "electricity", "kitchen"],
    location_detail: { county: "Kiambu", town: "Juja", estate: "Gate C", specific: "Near JKUAT Gate C" },
    landlord: { name: "Tonny Musyoki Simon", phone: "0758 917 689", preferred: "Phone call or WhatsApp", viewingHours: "Contact to arrange", verified: true },
  },
  {
    id: 13,
    images: [{ src: "/images/gate-c-bedsitter-2/1-bathroom.jpg", caption: "Own bathroom" }, { src: "/images/gate-c-bedsitter-2/2-wardrobe.jpg", caption: "Wardrobe rail" }, { src: "/images/gate-c-bedsitter-2/3-room.jpg", caption: "Main room" }, { src: "/images/gate-c-bedsitter-2/4-kitchen.jpg", caption: "Kitchen sink" }],
    views: 89,
    title: "Gate C Bedsitter (Self-Contained)",
    area: "Gate C",
    type: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 8000,
    deposit: "Contact for details",
    status: "Available",
    vacancies: 4,
    furnished: false,
    size: "Contact for details",
    description:
      "Self-contained bedsitter near JKUAT Gate C with its own toilet and sink, a separate kitchen counter with sink, a built-in clothes rail, and a tiled feature wall. Unfurnished, bright and freshly tiled throughout.",
    costs: { water: "Contact for details", electricity: "Contact for details", service: "Contact for details", garbage: "Contact for details", wifi: 0, parking: 0, other: "—" },
    amenities: ["water", "electricity", "kitchen", "wardrobes"],
    location_detail: { county: "Kiambu", town: "Juja", estate: "Gate C", specific: "Near JKUAT Gate C" },
    landlord: { name: "Tonny Musyoki Simon", phone: "0758 917 689", preferred: "Phone call or WhatsApp", viewingHours: "Contact to arrange", verified: true },
  },
  {
    id: 14,
    images: [{ src: "/images/gate-c-bedsitter-3/1-wardrobe.jpg", caption: "Wardrobe" }, { src: "/images/gate-c-bedsitter-3/2-kitchen.jpg", caption: "Kitchen sink" }, { src: "/images/gate-c-bedsitter-3/3-console.jpg", caption: "Storage console" }, { src: "/images/gate-c-bedsitter-3/4-toilet.jpg", caption: "Toilet" }],
    views: 132,
    title: "Gate C Bedsitter (Unit 3)",
    area: "Gate C",
    type: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 7500,
    deposit: "Contact for details",
    status: "Available",
    vacancies: 4,
    furnished: false,
    size: "Contact for details",
    description:
      "Self-contained bedsitter near JKUAT Gate C with its own toilet and sink, a separate kitchen counter with sink, a built-in clothes rail, and a striped feature wall. Unfurnished, bright and freshly tiled throughout.",
    costs: { water: "Contact for details", electricity: "Contact for details", service: "Contact for details", garbage: "Contact for details", wifi: 0, parking: 0, other: "—" },
    amenities: ["water", "electricity", "kitchen", "wardrobes"],
    location_detail: { county: "Kiambu", town: "Juja", estate: "Gate C", specific: "Near JKUAT Gate C" },
    landlord: { name: "Tonny Musyoki Simon", phone: "0758 917 689", preferred: "Phone call or WhatsApp", viewingHours: "Contact to arrange", verified: true },
  },
  {
    id: 15,
    images: [{ src: "/images/gate-c-bedsitter-4/1-room.jpg", caption: "Main room" }, { src: "/images/gate-c-bedsitter-4/2-kitchen.jpg", caption: "Kitchen sink" }],
    views: 306,
    title: "Gate C Bedsitter (Unit 4)",
    area: "Gate C",
    type: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 6000,
    deposit: "Contact for details",
    status: "Available",
    vacancies: 4,
    furnished: false,
    size: "Contact for details",
    description:
      "Bedsitter near JKUAT Gate C with its own kitchen counter, sink and tap, and a socket point. Unfurnished, tiled throughout.",
    costs: { water: "Contact for details", electricity: "Contact for details", service: "Contact for details", garbage: "Contact for details", wifi: 0, parking: 0, other: "—" },
    amenities: ["water", "electricity", "kitchen"],
    location_detail: { county: "Kiambu", town: "Juja", estate: "Gate C", specific: "Near JKUAT Gate C" },
    landlord: { name: "Tonny Musyoki Simon", phone: "0758 917 689", preferred: "Phone call or WhatsApp", viewingHours: "Contact to arrange", verified: true },
  },
  {
    id: 16,
    images: [{ src: "/images/gate-a-bedsitter-2/1-bathroom.jpg", caption: "Own bathroom" }, { src: "/images/gate-a-bedsitter-2/2-room.jpg", caption: "Main room" }, { src: "/images/gate-a-bedsitter-2/3-kitchen.jpg", caption: "Kitchen sink" }],
    views: 178,
    title: "Gate A Bedsitter (Unit 2)",
    area: "Gate A",
    type: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 9500,
    deposit: "Contact for details",
    status: "Available",
    vacancies: 4,
    furnished: false,
    size: "Contact for details",
    description:
      "Self-contained bedsitter near JKUAT Gate A with its own toilet, a separate kitchen counter with sink and tap, and a pink-painted interior. Unfurnished, tiled throughout.",
    costs: { water: "Contact for details", electricity: "Contact for details", service: "Contact for details", garbage: "Contact for details", wifi: 0, parking: 0, other: "—" },
    amenities: ["water", "electricity", "kitchen"],
    location_detail: { county: "Kiambu", town: "Juja", estate: "Gate A", specific: "Near JKUAT Gate A" },
    landlord: { name: "Tonny Musyoki Simon", phone: "0758 917 689", preferred: "Phone call or WhatsApp", viewingHours: "Contact to arrange", verified: true },
  },
];

// "0758 917 689" -> "254758917689"
export function toWhatsAppNumber(localPhone) {
  const digits = localPhone.replace(/\D/g, "");
  return digits.startsWith("0") ? "254" + digits.slice(1) : digits;
}

export function toTelHref(localPhone) {
  return `tel:${localPhone.replace(/\s/g, "")}`;
}

export function toWhatsAppHref(localPhone, message) {
  const number = toWhatsAppNumber(localPhone);
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}