export const site = {
  /** Wordmark, rendered uppercase with tracking in the lockup. */
  name: "Azeezarts",
  /** How the artist is referred to in running copy. */
  artist: "Azeez",
  tagline: "Contemporary Painting",
  email: "studio@azeezarts.com",
  studios: ["14 Ikoyi Crescent, Lagos", "Rua da Boavista 48, Lisbon"],
  description:
    "Paintings of interiors half-dissolved by light — rooms remembered rather than seen. Originals, commissions and studio news from Azeezarts.",
};

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
  { label: "WhatsApp", href: "https://wa.me/0000000000" },
] as const;

/**
 * The hero fan hangs real catalogue works, referenced by slug, so the
 * paintings on the front page are the paintings in the shop. Listed left to
 * right across the arc; the middle one sits at the crown.
 */
export const heroSlugs = [
  "the-guest-room",
  "dry-season-field",
  "threshold-i",
  "afternoon-that-would-not-end",
  "her-mothers-blue",
  "harmattan-morning",
  "lisbon-window-late-may",
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

/**
 * Photography slots.
 *
 * `src` is optional: leave it off and the slot shows a neutral field with its
 * caption, which doubles as the shot list. Drop a file into /public/studio and
 * add the path — nothing else changes.
 */
export type Photo = {
  label: string;
  tone: string;
  ratio?: string;
  src?: string;
  alt?: string;
  /** Source and licence — placeholder imagery only. Drop with the file. */
  credit?: string;
};

/** The large portrait beside the biography on /about. */
export const artistPortrait: Photo = {
  label: "Artist portrait",
  ratio: "1.424 / 1",
  tone: "#312a1f",
  src: "/studio/portrait.jpg",
  alt: "A painter's studio hung floor to ceiling with work",
  credit: "William Merritt Chase - Studio Interior - Google Art Project · Public domain · Wikimedia Commons",
};

/** The 4/5 studio frame beside the studio note on the home page. */
export const studioPortrait: Photo = {
  label: "Studio / artist at easel",
  ratio: "1.698 / 1",
  tone: "#463b32",
  src: "/studio/easel.jpg",
  alt: "A large studio interior, the painter at work at the centre",
  credit: "Courbet LAtelier du peintre · Public domain · Wikimedia Commons",
};

export const studioShots: Photo[] = [
  {
    label: "Palette, Tuesday",
    ratio: "2.105 / 1",
    tone: "#6a5e42",
    src: "/studio/palette.jpg",
    alt: "The tools of the studio laid out on a table",
    credit: "Jean-Baptiste Simeon Chardin - Still life with attributes of the arts - Google Art Project · Public domain · Wikimedia Commons",
  },
  {
    label: "Linen, stretched",
    ratio: "1.297 / 1",
    tone: "#a49376",
    src: "/studio/linen.jpg",
    alt: "The reverse of a stretched canvas, bare linen on its bars",
    credit: "Cornelius Norbertus Gijsbrechts - Trompe l'oeil. The Reverse of a Framed Painting - Google Art Project · Public domain · Wikimedia Commons",
  },
  {
    label: "Wall of studies",
    ratio: "0.733 / 1",
    tone: "#563937",
    src: "/studio/studies-wall.jpg",
    alt: "A studio wall crowded with plaster casts and studies",
    credit: "1872 Menzel Atelierwand anagoria · Public domain · Wikimedia Commons",
  },
  {
    label: "North window",
    ratio: "0.684 / 1",
    tone: "#4e4949",
    src: "/studio/north-window.jpg",
    alt: "A figure at a tall window, looking out into the light",
    credit: "Gustave Caillebotte - Jeune homme à sa fenêtre (B 32) · Public domain · Wikimedia Commons",
  },
];

export const socialGrid: Photo[] = [
  {
    label: "Studio, 6am",
    ratio: "1 / 1",
    tone: "#403529",
    src: "/studio/social-1.jpg",
    alt: "A painter at the easel in early light",
    credit: "Jan Vermeer - The Art of Painting - Google Art Project · Public domain · Wikimedia Commons",
  },
  {
    label: "Glaze test",
    ratio: "1 / 1",
    tone: "#3d2c17",
    src: "/studio/social-2.jpg",
    alt: "Studio vessels and cloth on a bare table",
    credit: "Bodegon con almirez, cántaro y caldero de cobre · Public domain · Wikimedia Commons",
  },
  {
    label: "Crating day",
    ratio: "1 / 1",
    tone: "#928646",
    src: "/studio/social-3.jpg",
    alt: "A plaster figure, books and a rose on a studio table",
    credit: "Still life with plaster torso, a rose and two novels - Vincent Van Gogh · Public domain · Wikimedia Commons",
  },
  {
    label: "Lisbon light",
    ratio: "1 / 1",
    tone: "#8b6d68",
    src: "/studio/social-4.jpg",
    alt: "Fruit and cloth arranged on a table",
    credit: "Pommes et oranges, par Paul Cézanne, Musée d'Orsay, Paris (36322958725) · Public domain · Wikimedia Commons",
  },
  {
    label: "Brush repair",
    ratio: "1 / 1",
    tone: "#817163",
    src: "/studio/social-5.jpg",
    alt: "A dim patterned interior",
    credit: "'Interior' by Édouard Vuillard, 1904, Pushkin Museum · Public domain · Wikimedia Commons",
  },
  {
    label: "Install, Kó",
    ratio: "1 / 1",
    tone: "#5a3a28",
    src: "/studio/social-6.jpg",
    alt: "A quiet tiled room seen through a doorway",
    credit: "Een moeder die het haar van haar kind reinigt, bekend als ‘Moedertaak’ Rijksmuseum SK-C-149 · Public domain · Wikimedia Commons",
  },
];
