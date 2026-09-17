export type ArtworkStatus = "Available" | "Reserved" | "Sold";

export type ArtworkCategory =
  | "Abstract"
  | "Interior"
  | "Landscape"
  | "Portrait"
  | "Study";

/** Where a photograph of a work is used. */
export type ImageRole = "primary" | "detail" | "in-situ" | "verso";

export type ArtworkImage = {
  /** Public path (`/artwork/…`) or a full CDN URL once storage is wired up. */
  url: string;
  role: ImageRole;
  /** Describe the painting, not the file. Read aloud by screen readers. */
  alt: string;
  /**
   * Source and licence. Only present while placeholder imagery is in use —
   * drop it along with the file when real photography lands.
   */
  credit?: string;
};

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dims: string;
  /** Price in whole US dollars. Works that are not for sale use `null`. */
  price: number | null;
  category: ArtworkCategory;
  series: string;
  status: ArtworkStatus;
  /** Aspect ratio for the plate, as a CSS `aspect-ratio` value. */
  ratio: string;
  /**
   * The dominant pigment of the painting, as a single solid colour. Plates
   * render this as a lit, woven field — never as a gradient. Each one is a
   * real pigment so the catalogue reads as a body of work rather than a
   * swatch library.
   */
  tone: string;
  /** Human name for the pigment, shown on the detail page. */
  pigment: string;
  /**
   * Photography for this work. Until a `primary` image exists the site falls
   * back to `tone`, so the catalogue can be photographed a few works at a time.
   * The detail page also uses `detail`, `in-situ` and `verso` for its thumbnails.
   */
  images?: ArtworkImage[];
  story: string;
  featured?: boolean;
};

export const artworks: Artwork[] = [
  {
    slug: "afternoon-that-would-not-end",
    title: "Afternoon That Would Not End",
    year: 2025,
    medium: "Oil and cold wax on linen",
    dims: "48 × 60 in · 122 × 152 cm",
    price: 9800,
    category: "Interior",
    series: "Rooms Remembered",
    status: "Available",
    ratio: "1.141 / 1",
    tone: "#8b8381",
    pigment: "Burnt sienna",
    images: [
      {
        url: "/artwork/afternoon-that-would-not-end.jpg",
        role: "primary",
        alt: "A quiet interior with sunlight falling across the floorboards beside a tall window",
        credit: "Stue i Strandgade med solskin på gulvet · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "A room in Lagos at four in the afternoon, when the light comes in sideways and everything in it slows. I painted it eleven times before the heat finally stayed in the surface.",
    featured: true,
  },
  {
    slug: "threshold-i",
    title: "Threshold I",
    year: 2025,
    medium: "Oil on cold-pressed linen",
    dims: "36 × 48 in · 91 × 122 cm",
    price: 6400,
    category: "Abstract",
    series: "Thresholds",
    status: "Available",
    ratio: "0.753 / 1",
    tone: "#2c3b30",
    pigment: "Indigo",
    images: [
      {
        url: "/artwork/threshold-i.jpg",
        role: "primary",
        alt: "A dark green-black field broken by falling sparks of gold",
        credit: "Whistler-Nocturne in black and gold · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "The first of the doorway paintings. Nothing is depicted; the canvas is simply divided the way a threshold divides a house, and the colour on either side is asked to behave differently.",
    featured: true,
  },
  {
    slug: "her-mothers-blue",
    title: "Her Mother’s Blue",
    year: 2024,
    medium: "Oil and pigment on panel",
    dims: "30 × 30 in · 76 × 76 cm",
    price: 5200,
    category: "Portrait",
    series: "Inheritance",
    status: "Sold",
    ratio: "1.124 / 1",
    tone: "#403f32",
    pigment: "Slate blue",
    images: [
      {
        url: "/artwork/her-mothers-blue.jpg",
        role: "primary",
        alt: "A seated figure in profile against a grey wall, almost entirely in silhouette",
        credit: "Whistlers Mother high res · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "Made from a photograph so faded the face had almost gone. What remained was the blue of a dress, so the blue became the portrait.",
    featured: true,
  },
  {
    slug: "lisbon-window-late-may",
    title: "Lisbon Window, Late May",
    year: 2025,
    medium: "Oil on linen",
    dims: "24 × 30 in · 61 × 76 cm",
    price: 3800,
    category: "Interior",
    series: "Rooms Remembered",
    status: "Available",
    ratio: "0.851 / 1",
    tone: "#626368",
    pigment: "Yellow ochre",
    images: [
      {
        url: "/artwork/lisbon-window-late-may.jpg",
        role: "primary",
        alt: "Sunlight through a window, dust turning slowly in the beam of an empty room",
        credit: "Hammershøi Dust motes dancing · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "Painted in a rented apartment in Graça across five mornings, each one begun before the sun cleared the opposite roof.",
    featured: true,
  },
  {
    slug: "dry-season-field",
    title: "Dry Season Field",
    year: 2024,
    medium: "Oil and sand on canvas",
    dims: "40 × 54 in · 102 × 137 cm",
    price: 7600,
    category: "Landscape",
    series: "Harmattan",
    status: "Reserved",
    ratio: "1.271 / 1",
    tone: "#a98b68",
    pigment: "Olive earth",
    images: [
      {
        url: "/artwork/dry-season-field.jpg",
        role: "primary",
        alt: "A haystack in a field at sunset, the light broken into flecks of colour",
        credit: "Claude Monet - Graystaks I · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "Fine sand from the road outside the studio is mixed into the lower third, so the ground of the painting is literally the ground it describes.",
    featured: true,
  },
  {
    slug: "what-the-hallway-kept",
    title: "What the Hallway Kept",
    year: 2025,
    medium: "Oil on linen",
    dims: "36 × 36 in · 91 × 91 cm",
    price: 5900,
    category: "Interior",
    series: "Rooms Remembered",
    status: "Available",
    ratio: "0.799 / 1",
    tone: "#c4b093",
    pigment: "Raw umber",
    images: [
      {
        url: "/artwork/what-the-hallway-kept.jpg",
        role: "primary",
        alt: "A pale panelled room, a figure seated at a keyboard against the far wall",
        credit: "Vilhelm Hammershoi Interior wit a girl at the clavier · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "Corridors hold more than rooms do. This one is from a house that was sold in 2011; I have been painting its hallway ever since.",
  },
  {
    slug: "threshold-ii-evening",
    title: "Threshold II, Evening",
    year: 2026,
    medium: "Oil and cold wax on linen",
    dims: "48 × 48 in · 122 × 122 cm",
    price: 8400,
    category: "Abstract",
    series: "Thresholds",
    status: "Available",
    ratio: "1.572 / 1",
    tone: "#829090",
    pigment: "Payne’s grey",
    images: [
      {
        url: "/artwork/threshold-ii-evening.jpg",
        role: "primary",
        alt: "A lone figure on a shore beneath an enormous grey sky",
        credit: "Caspar David Friedrich - Der Mönch am Meer - Google Art Project · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "The same division as Threshold I, made at dusk over six weeks. The two halves have almost agreed with each other by the end.",
  },
  {
    slug: "study-for-inheritance",
    title: "Study for Inheritance",
    year: 2024,
    medium: "Oil on paper, mounted",
    dims: "16 × 20 in · 41 × 51 cm",
    price: 1900,
    category: "Study",
    series: "Inheritance",
    status: "Available",
    ratio: "1.398 / 1",
    tone: "#6d5434",
    pigment: "Raw sienna",
    images: [
      {
        url: "/artwork/study-for-inheritance.jpg",
        role: "primary",
        alt: "A warm haze of sunset over water, forms barely resolving",
        credit: "Joseph Mallord William Turner - Yacht Approaching the Coast · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "A working sheet, kept because the hand is quicker here than in the finished painting. Sold mounted and unframed.",
  },
  {
    slug: "harmattan-morning",
    title: "Harmattan Morning",
    year: 2023,
    medium: "Oil on canvas",
    dims: "30 × 40 in · 76 × 102 cm",
    price: null,
    category: "Landscape",
    series: "Harmattan",
    status: "Sold",
    ratio: "1.329 / 1",
    tone: "#aea18b",
    pigment: "Terre verte",
    images: [
      {
        url: "/artwork/harmattan-morning.jpg",
        role: "primary",
        alt: "A castle dissolving into mist and low sun over still water",
        credit: "Joseph Mallord William Turner 062 · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "The dust season flattens distance until the horizon stops being a line. Held in a private collection, Accra.",
  },
  {
    slug: "the-guest-room",
    title: "The Guest Room",
    year: 2026,
    medium: "Oil on linen",
    dims: "42 × 56 in · 107 × 142 cm",
    price: 8900,
    category: "Interior",
    series: "Rooms Remembered",
    status: "Available",
    ratio: "1.215 / 1",
    tone: "#593e1e",
    pigment: "Terracotta",
    images: [
      {
        url: "/artwork/the-guest-room.jpg",
        role: "primary",
        alt: "A dim patterned interior, two figures still against the wallpaper",
        credit: "Intérieur, mère et sœur de l'artiste, par Édouard Vuillard · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "A room nobody sleeps in, kept ready for years. The bed is not painted; only the readiness is.",
  },
  {
    slug: "portrait-of-a-borrowed-coat",
    title: "Portrait of a Borrowed Coat",
    year: 2025,
    medium: "Oil and pigment on panel",
    dims: "24 × 24 in · 61 × 61 cm",
    price: 4200,
    category: "Portrait",
    series: "Inheritance",
    status: "Available",
    ratio: "0.938 / 1",
    tone: "#95887c",
    pigment: "Oxblood",
    images: [
      {
        url: "/artwork/portrait-of-a-borrowed-coat.jpg",
        role: "primary",
        alt: "A head-and-shoulders portrait against a bare warm ground",
        credit: "Vilhelm Hammershøi, Kunstnerens hustru Ida, f Ilsted, 1894, KMS6691, Statens Museum for Kunst · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "The sitter is gone from the picture; the coat kept the shape of them and that was enough to paint.",
  },
  {
    slug: "small-threshold-study",
    title: "Small Threshold Study",
    year: 2026,
    medium: "Oil on board",
    dims: "12 × 16 in · 30 × 41 cm",
    price: 1400,
    category: "Study",
    series: "Thresholds",
    status: "Available",
    ratio: "0.732 / 1",
    tone: "#3f3e38",
    pigment: "Viridian earth",
    images: [
      {
        url: "/artwork/small-threshold-study.jpg",
        role: "primary",
        alt: "Boats on a grey shoreline at dusk, almost dissolved into the water",
        credit: "James McNeill Whistler - Nocturne Grey and Silver--Chelsea Embankment, Winter (c. 1879) · Public domain · Wikimedia Commons",
      },
    ],
    story:
      "One sitting, wet into wet. Studies like this are how the larger Thresholds find their proportion.",
  },
];

export const categories: ArtworkCategory[] = [
  "Abstract",
  "Interior",
  "Landscape",
  "Portrait",
  "Study",
];

export const seriesNames: string[] = Array.from(
  new Set(artworks.map((a) => a.series)),
);

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getFeatured(): Artwork[] {
  return artworks.filter((a) => a.featured);
}

export function getRelated(artwork: Artwork, limit = 4): Artwork[] {
  const sameSeries = artworks.filter(
    (a) => a.series === artwork.series && a.slug !== artwork.slug,
  );
  if (sameSeries.length >= limit) return sameSeries.slice(0, limit);
  const filler = artworks.filter(
    (a) => a.slug !== artwork.slug && a.series !== artwork.series,
  );
  return [...sameSeries, ...filler].slice(0, limit);
}

/** The photograph for a given role, if one has been supplied. */
export function imageFor(
  artwork: Artwork,
  role: ImageRole,
): ArtworkImage | undefined {
  return artwork.images?.find((i) => i.role === role);
}

/** The main photograph of a work, used by every card, plate and thumbnail. */
export function primaryImage(artwork: Artwork): ArtworkImage | undefined {
  return imageFor(artwork, "primary");
}

/** Alt text that stays useful whether or not a photograph exists. */
export function plateAlt(artwork: Artwork): string {
  return (
    primaryImage(artwork)?.alt ??
    `${artwork.title}, ${artwork.year} — ${artwork.medium}, ${artwork.dims}`
  );
}

/** Works that can actually be bought: priced, and not already spoken for. */
export function isPurchasable(artwork: Artwork): boolean {
  return artwork.price !== null && artwork.status === "Available";
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Not for sale";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
