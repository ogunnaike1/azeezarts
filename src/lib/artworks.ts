export type ArtworkStatus = "Available" | "Reserved" | "Sold";

export type ArtworkCategory =
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
    slug: "sunday-companion",
    title: "Sunday Companion",
    year: 2025,
    medium: "Oil on canvas",
    dims: "24 × 36 in · 61 × 91 cm",
    price: 1800,
    category: "Portrait",
    series: "Gele",
    status: "Available",
    ratio: "0.661 / 1",
    tone: "#8fb0dc",
    pigment: "Cerulean",
    images: [
      {
        url: "/artwork/sunday-companion.jpg",
        role: "primary",
        alt: "A woman in a burgundy velvet gown and pleated gele sits on a yellow sofa holding an orange tabby cat, a tall plant and a blue sky behind her",
      },
    ],
    story:
      "A woman in burgundy velvet and a sculpted gele settles into a mustard sofa with her ginger cat. Everything is soft except her gaze, which stays level with yours.",
    featured: true,
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    year: 2025,
    medium: "Oil on canvas",
    dims: "24 × 36 in · 61 × 91 cm",
    price: 2200,
    category: "Portrait",
    series: "Gele",
    status: "Available",
    ratio: "0.676 / 1",
    tone: "#5f6670",
    pigment: "Cadmium yellow",
    images: [
      {
        url: "/artwork/golden-hour.jpg",
        role: "primary",
        alt: "A woman in a folded golden gele and bright blue eyeshadow against a grey ground, a blue butterfly resting on her shoulder",
      },
    ],
    story:
      "A gele folded like origami in cadmium yellow, bright blue lids and a single butterfly landing on the shoulder — stillness with one small movement in it.",
    featured: true,
  },
  {
    slug: "crimson-crown",
    title: "Crimson Crown",
    year: 2025,
    medium: "Oil on canvas",
    dims: "24 × 30 in · 61 × 76 cm",
    price: 1500,
    category: "Portrait",
    series: "Gele",
    status: "Available",
    ratio: "0.815 / 1",
    tone: "#1f7f93",
    pigment: "Alizarin crimson",
    images: [
      {
        url: "/artwork/crimson-crown.jpg",
        role: "primary",
        alt: "A woman looks down beneath a huge glossy red gele, her eyelids painted pale blue, against a teal background",
      },
    ],
    story:
      "The gele is the whole sky of this painting: glossy, heavy, lit from above. Beneath it a face lowered in thought, lids washed in cool blue.",
    featured: true,
  },
  {
    slug: "indigo-morning",
    title: "Indigo Morning",
    year: 2025,
    medium: "Oil on canvas",
    dims: "18 × 24 in · 46 × 61 cm",
    price: 900,
    category: "Portrait",
    series: "Gele",
    status: "Available",
    ratio: "0.745 / 1",
    tone: "#6f7fb0",
    pigment: "Ultramarine",
    images: [
      {
        url: "/artwork/indigo-morning.jpg",
        role: "primary",
        alt: "A woman in profile looks down, wearing a blue and white striped gele, a gold earring and a red bead necklace",
      },
    ],
    story:
      "A profile in blue stripes and coral beads. The painting is built from one colour family, so the warmth of the skin does all the talking.",
    featured: true,
  },
  {
    slug: "together-alone",
    title: "Together, Alone",
    year: 2025,
    medium: "Oil on canvas",
    dims: "36 × 24 in · 91 × 61 cm",
    price: 2400,
    category: "Interior",
    series: "Scenes",
    status: "Available",
    ratio: "1.45 / 1",
    tone: "#c4622a",
    pigment: "Cadmium orange",
    images: [
      {
        url: "/artwork/together-alone.jpg",
        role: "primary",
        alt: "Four faceless figures on a green sofa in an orange room, three of them looking into their phones, the fourth fading into the wall",
      },
    ],
    story:
      "A room full of people and no one in it. Three faces are lost to screens; the fourth has already begun to dissolve into the wall behind.",
    featured: true,
  },
  {
    slug: "silver-lashes",
    title: "Silver Lashes",
    year: 2025,
    medium: "Oil on canvas",
    dims: "18 × 24 in · 46 × 61 cm",
    price: 1600,
    category: "Portrait",
    series: "Gele",
    status: "Available",
    ratio: "0.75 / 1",
    tone: "#3f8a82",
    pigment: "Permanent red",
    images: [
      {
        url: "/artwork/silver-lashes.jpg",
        role: "primary",
        alt: "A woman in a large red bow-tied gele with white eyeshadow and lashes, a silver earring and a white collar against a green-blue ground",
      },
    ],
    story:
      "A gele tied as a great red bow, white eyeshadow and painted lashes — ceremony and confidence in the same picture.",
    featured: true,
  },
  {
    slug: "over-the-shoulder",
    title: "Over the Shoulder",
    year: 2025,
    medium: "Oil on canvas",
    dims: "12 × 16 in · 30 × 41 cm",
    price: 700,
    category: "Portrait",
    series: "Portraits",
    status: "Available",
    ratio: "0.73 / 1",
    tone: "#c89a82",
    pigment: "Burnt orange",
    images: [
      {
        url: "/artwork/over-the-shoulder.jpg",
        role: "primary",
        alt: "A woman in an orange headwrap looks back over her shoulder, her face half in shadow, a blue cloth at the edge of the frame",
      },
    ],
    story:
      "Painted almost entirely in shadow: an orange headwrap, one lit cheek, and a glance back over the shoulder.",
  },
  {
    slug: "field-of-light",
    title: "Field of Light",
    year: 2025,
    medium: "Oil on canvas",
    dims: "20 × 30 in · 51 × 76 cm",
    price: 1100,
    category: "Landscape",
    series: "Scenes",
    status: "Available",
    ratio: "0.693 / 1",
    tone: "#8fa6d8",
    pigment: "Naples yellow",
    images: [
      {
        url: "/artwork/field-of-light.jpg",
        role: "primary",
        alt: "A woman in a long red robe with dark hair stands in a yellow flower meadow looking toward distant mountains and birds",
      },
    ],
    story:
      "A figure in red walks a path of light through a meadow, mountains ahead and a flock of birds crossing the blue.",
  },
  {
    slug: "sunflower-crown",
    title: "Sunflower Crown",
    year: 2025,
    medium: "Oil on canvas",
    dims: "16 × 20 in · 41 × 51 cm",
    price: 800,
    category: "Portrait",
    series: "Portraits",
    status: "Available",
    ratio: "0.769 / 1",
    tone: "#4f6fc0",
    pigment: "Cobalt blue",
    images: [
      {
        url: "/artwork/sunflower-crown.jpg",
        role: "primary",
        alt: "A portrait of a young woman with sunflowers and lilies growing around her head against a deep blue background",
      },
    ],
    story:
      "Sunflowers and lilies grow around a quiet face on a field of cobalt blue. Signed and dated 2025.",
  },
  {
    slug: "little-one",
    title: "Little One",
    year: 2025,
    medium: "Oil on canvas",
    dims: "16 × 20 in · 41 × 51 cm",
    price: null,
    category: "Portrait",
    series: "Portraits",
    status: "Sold",
    ratio: "0.822 / 1",
    tone: "#a9c4dd",
    pigment: "Pale blue",
    images: [
      {
        url: "/artwork/little-one.jpg",
        role: "primary",
        alt: "A portrait of a baby boy in a white top against a soft pale-blue background, looking directly at the viewer",
      },
    ],
    story:
      "A commissioned portrait of a small boy with a very serious expression, painted in warm browns against a pale blue ground.",
  },
  {
    slug: "the-elder",
    title: "The Elder",
    year: 2025,
    medium: "Oil on canvas",
    dims: "20 × 26 in · 51 × 66 cm",
    price: null,
    category: "Portrait",
    series: "Portraits",
    status: "Sold",
    ratio: "0.775 / 1",
    tone: "#2f9aa0",
    pigment: "Viridian",
    images: [
      {
        url: "/artwork/the-elder.jpg",
        role: "primary",
        alt: "A portrait of an older man in round glasses and a pale green shirt with a pen in his pocket, against a teal and green glowing ground",
      },
    ],
    story:
      "A commissioned portrait of a man in round glasses and a pale green shirt, a pen in his breast pocket and a halo of light behind him.",
  },
  {
    slug: "two-of-us",
    title: "Two of Us",
    year: 2025,
    medium: "Coloured pencil on paper, framed",
    dims: "16 × 12 in · 41 × 30 cm",
    price: null,
    category: "Study",
    series: "Portraits",
    status: "Sold",
    ratio: "1.778 / 1",
    tone: "#3f8fb0",
    pigment: "Cerulean",
    images: [
      {
        url: "/artwork/two-of-us.jpg",
        role: "primary",
        alt: "A framed coloured-pencil portrait of two smiling women side by side against a blue background, one in braids and one in a pink headband",
      },
    ],
    story:
      "A commissioned double portrait in coloured pencil — two people leaning in close, drawn in layers until the skin glows.",
  },
];

export const categories: ArtworkCategory[] = [
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
