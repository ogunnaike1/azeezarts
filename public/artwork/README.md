# Artwork photography

## ⚠ The images here are NOT this artist's work

They are public-domain paintings from Wikimedia Commons, standing in so the
layout, grid rhythm, hero carousel and zoom can be judged with real painting in
them. **They must be removed before launch.**

This matters more than usual here: the site is a shop. Displaying a Hammershøi
under an invented title at $9,800 is fine on a staging URL and misrepresentation
on a live one.

### What ships now

| Catalogue slug | Source work | Licence |
| --- | --- | --- |
| `afternoon-that-would-not-end` | Stue i Strandgade med solskin på gulvet | Public domain |
| `dry-season-field` | Claude Monet - Graystaks I | Public domain |
| `harmattan-morning` | Joseph Mallord William Turner 062 | Public domain |
| `her-mothers-blue` | Whistlers Mother high res | Public domain |
| `lisbon-window-late-may` | Hammershøi Dust motes dancing | Public domain |
| `portrait-of-a-borrowed-coat` | Vilhelm Hammershøi, Kunstnerens hustru Ida, f Ilsted, 1894, KMS6691, Statens Museum for Kunst | Public domain |
| `small-threshold-study` | James McNeill Whistler - Nocturne Grey and Silver--Chelsea Embankment, Winter (c. 1879) | Public domain |
| `study-for-inheritance` | Joseph Mallord William Turner - Yacht Approaching the Coast | Public domain |
| `the-guest-room` | Intérieur, mère et sœur de l'artiste, par Édouard Vuillard | Public domain |
| `threshold-i` | Whistler-Nocturne in black and gold | Public domain |
| `threshold-ii-evening` | Caspar David Friedrich - Der Mönch am Meer - Google Art Project | Public domain |
| `what-the-hallway-kept` | Vilhelm Hammershoi Interior wit a girl at the clavier | Public domain |

All are public domain — no attribution is legally required, but the source is
recorded in each work's `images[].credit` field so nothing here is untraceable.

---

## Replacing them with real photography

Drop files here, then update the matching entry in `src/lib/artworks.ts`:

```ts
{
  slug: "threshold-i",
  ratio: "0.75 / 1",          // measure from the real photograph
  tone: "#2e3d55",            // dominant colour; the fallback behind the image
  images: [
    { url: "/artwork/threshold-i.jpg",        role: "primary",
      alt: "Threshold I — a canvas divided vertically, indigo against bone" },
    { url: "/artwork/threshold-i-detail.jpg", role: "detail",  alt: "Impasto along the division" },
    { url: "/artwork/threshold-i-situ.jpg",   role: "in-situ", alt: "Hung above a console table" },
    { url: "/artwork/threshold-i-verso.jpg",  role: "verso",   alt: "Signature on the stretcher" },
  ],
}
```

Delete the `credit` field as you go — it exists only to mark placeholder images.

Only `primary` is required. Until one exists the site falls back to `tone`, so
the catalogue can be photographed a few works at a time.

| Role | Used by |
| --- | --- |
| `primary` | every card, the hero, the detail plate, the bag |
| `detail` | detail page thumbnail — a close crop of the surface |
| `in-situ` | detail page thumbnail — hung in a room, for scale |
| `verso` | detail page thumbnail — signature, date, stretcher |

Missing `detail` / `in-situ` / `verso` fall back to zoomed crops of `primary`.

## Specs

- **Format** JPEG or WebP. `next/image` re-encodes to AVIF and resizes, so upload
  the largest version you have rather than pre-resizing.
- **Long edge** 2400–3000px. The hero is full-bleed and the detail view zooms to
  2.2×, so anything smaller softens.
- **Colour** sRGB, daylight, neutral wall. Buyers decide from these.
- **Crop** to the canvas edge — no frame, no floor, square to the camera.
- **Naming** `{slug}.jpg`, `{slug}-detail.jpg`, `{slug}-situ.jpg`, `{slug}-verso.jpg`.

## Alt text

Describe the painting, not the file. "Threshold I — a canvas divided vertically,
indigo against bone" beats "artwork image". It is what a blind collector hears.
