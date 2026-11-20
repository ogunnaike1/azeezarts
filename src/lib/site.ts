export const site = {
  /** Wordmark, rendered uppercase with tracking in the lockup. */
  name: "Azeezarts",
  /** How the artist is referred to in running copy. */
  artist: "Azeez",
  tagline: "Contemporary Painting",
  email: "studio@azeezarts.com",
  /**
   * WhatsApp number in international format, digits only (no +, spaces or
   * leading zeros), e.g. "2348012345678". Set NEXT_PUBLIC_WHATSAPP_NUMBER, or
   * replace the fallback below. Every "order", "enquire" and "commission"
   * button on the site opens a chat with this number.
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2340000000000",
  studios: ["14 Ikoyi Crescent, Lagos", "Rua da Boavista 48, Lisbon"],
  description:
    "Paintings of interiors half-dissolved by light — rooms remembered rather than seen. Originals, commissions and studio news from Azeezarts.",
};

/** A wa.me link that opens a chat with the studio, message pre-filled. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/", label: "Home", num: "01" },
  { href: "/works", label: "Works", num: "02" },
  { href: "/shop", label: "Shop", num: "03" },
  { href: "/about", label: "About", num: "04" },
  { href: "/commissions", label: "Commissions", num: "05" },
  { href: "/contact", label: "Contact", num: "06" },
] as const;

export const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "WhatsApp", href: whatsappLink("Hello Azeezarts, I would like to know more about your paintings.") },
] as const;

/**
 * The hero fan hangs real catalogue works, referenced by slug, so the
 * paintings on the front page are the paintings in the shop. Listed left to
 * right across the arc; the middle one sits at the crown.
 */
export const heroSlugs = [
  "indigo-morning",
  "silver-lashes",
  "crimson-crown",
  "golden-hour",
  "sunday-companion",
  "over-the-shoulder",
  "field-of-light",
] as const;

export const quotes = [
  {
    text: "It arrived crated like a piece of furniture and hung like a window. Six months on, the room still organises itself around it.",
    who: "Private collector, Copenhagen",
  },
  {
    text: "Azeez paints the residue of a place rather than the place. You keep finding rooms in it you thought you had forgotten.",
    who: "Adaeze Nwosu, curator",
  },
  {
    text: "The commission process was unhurried and completely transparent. We saw it at every stage and it still surprised us.",
    who: "Collectors, Lisbon",
  },
];

export const studioStats = [
  { value: "14", label: "Years painting" },
  { value: "21", label: "Exhibitions" },
  { value: "9", label: "Countries collected" },
];

export const timeline = [
  {
    year: "2026",
    title: "Rooms Remembered — solo",
    place: "Kó Gallery, Lagos",
  },
  {
    year: "2025",
    title: "Thresholds — solo",
    place: "Galeria Foco, Lisbon",
  },
  {
    year: "2025",
    title: "Hand, Ground, Weather — group",
    place: "Cromwell Place, London",
  },
  {
    year: "2024",
    title: "Sahel Residency",
    place: "Ségou, Mali",
  },
  {
    year: "2023",
    title: "Inheritance — two-person",
    place: "Tiwani Contemporary, Lagos",
  },
  {
    year: "2021",
    title: "Emerging Painter Prize, shortlist",
    place: "Art X Lagos",
  },
];

export const commissionSteps = [
  {
    num: "01",
    title: "The conversation",
    body:
      "We talk about the room, the light it gets, the scale it can hold and what you want the painting to carry. No fee, no obligation.",
    time: "Week one",
  },
  {
    num: "02",
    title: "Studies on paper",
    body:
      "Two or three small oil studies explore palette and composition. You choose the direction, and nothing proceeds until you do.",
    time: "Weeks two to four",
  },
  {
    num: "03",
    title: "The painting",
    body:
      "Built in thin glazes with drying time between layers. Progress photographs arrive every fortnight; revisions are expected, not grudging.",
    time: "Two to four months",
  },
  {
    num: "04",
    title: "Crate and arrival",
    body:
      "Varnished, signed, photographed and packed in a bespoke crate with a certificate of authenticity. Insured, worldwide.",
    time: "Two weeks",
  },
];

export const commissionSizes = [
  { name: "Intimate", dims: "24 × 30 in · 61 × 76 cm", price: "from $2,800" },
  { name: "Standard", dims: "36 × 48 in · 91 × 122 cm", price: "from $5,400" },
  { name: "Statement", dims: "48 × 60 in · 122 × 152 cm", price: "from $9,200" },
  { name: "Architectural", dims: "Bespoke, up to 96 in", price: "on request" },
];

/** A photograph slot: studio shots, the artist portrait, the social grid. */
export type Photo = {
  label: string;
  tone: string;
  ratio?: string;
  src?: string;
  alt?: string;
};

/** The large portrait beside the biography on /about. */
export const artistPortrait: Photo = {
  label: "Azeez in the studio",
  ratio: "0.75 / 1",
  tone: "#b9893f",
  src: "/studio/artist-easel.jpg",
  alt: "The artist at the easel, brush in hand, beside a painting of a woman in a red gele",
};

/** The studio frame beside the studio note on the home page. */
export const studioPortrait: Photo = {
  label: "At the easel",
  ratio: "0.75 / 1",
  tone: "#a5762f",
  src: "/studio/artist-portrait.jpg",
  alt: "The artist smiling in the studio next to a painting of a woman in a red gele",
};

export const studioShots: Photo[] = [
  {
    label: "Detail — striped gele",
    ratio: "1.308 / 1",
    tone: "#4a6fc0",
    src: "/studio/detail-blue-gele.jpg",
    alt: "Close detail of a blue and white striped gele from Indigo Morning",
  },
  {
    label: "Detail — red gele",
    ratio: "2.059 / 1",
    tone: "#b0122a",
    src: "/studio/detail-red-gele.jpg",
    alt: "Close detail of the glossy folds of a red gele from Crimson Crown",
  },
  {
    label: "Detail — meadow",
    ratio: "0.733 / 1",
    tone: "#cdbf5a",
    src: "/studio/detail-field.jpg",
    alt: "Close detail of wildflowers in the meadow of Field of Light",
  },
  {
    label: "Detail — the bow",
    ratio: "0.688 / 1",
    tone: "#a82a2a",
    src: "/studio/detail-bow.jpg",
    alt: "Close detail of the knotted red gele in Silver Lashes",
  },
];
