# Azeezarts — artist portfolio & shop

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

## Routes

| Route           | Rendering | What it is                                            |
| --------------- | --------- | ----------------------------------------------------- |
| `/`             | Static    | Hero carousel, selected works, studio, collector quotes |
| `/works`        | Static    | Full catalogue with subject + series filters           |
| `/works/[slug]` | SSG       | One page per artwork, prerendered from the data file   |
| `/shop`         | Static    | Availability filter, sorting, add-to-bag               |
| `/about`        | Static    | Biography, studio shots, exhibition timeline           |
| `/commissions`  | Static    | Four-stage process, pricing, request form              |
| `/contact`      | Static    | Studio details and enquiry form                        |
| `/api/enquiry`  | Dynamic   | Intake endpoint for every form on the site             |

## Where to edit things

- **Artworks** — `src/lib/artworks.ts`. One array drives the catalogue, the shop,
  the featured row, related works and the prerendered detail pages. Add an entry
  and every surface picks it up.
- **Copy, nav, exhibitions, commission tiers** — `src/lib/site.ts`. The brand
  fields live at the top: `name` (the wordmark), `artist` (how the painter is
  referred to in running copy), `email`.
- **Logo** — `src/components/Logo.tsx` draws the mark inline and `public/logo.svg`
  holds a standalone copy. **Both are interim placeholders.** Replace them with
  the real AZ monogram exported as a single path, and keep `stroke`/`fill` set to
  `currentColor` — that is what lets the mark invert to cream over the dark hero
  without a second asset. `src/app/icon.svg` (the favicon) needs the same swap,
  but with literal colours, since favicons cannot inherit.
- **Design tokens** (palette, fonts, easing) — the `@theme` block at the top of
  `src/app/globals.css`. Colours are exposed as Tailwind utilities:
  `bg-canvas`, `text-ink`, `text-ember`, `border-line`, and so on.

### Colour system

Five warm tones, light to dark. Nothing else ships — the stylesheet contains
exactly these five hex values, and the paintings supply the hue.

| Tone | Hex | Job |
| --- | --- | --- |
| Linen | `#f5f1ea` | The page ground, every route |
| Khaki | `#d7c9b8` | Inset `.band` sections, image grounds, mobile menu, footer text |
| Camel | `#b2967d` | Hairlines, field underlines, disabled edges — **never text** (2.5:1) |
| Cocoa | `#7d5a44` | Secondary copy, meta, accent, button hover, focus ring |
| Espresso | `#4a342a` | Headings, body, primary buttons, the footer ground, the hero scrim |

The range runs Linen → Khaki → Espresso, so sections separate by weight rather
than by a second colour.

**Contrast.** Camel is the trap: it reads as a usable brown but only reaches
2.5:1 on Linen and 4.2:1 on Espresso, so it is restricted to rules. Cocoa is the
other trap: 5.5:1 on Linen but only 3.8:1 on Khaki. Rather than override colours
per element inside a Khaki band, `.band` re-points the semantic tokens:

```css
.band {
  background: var(--color-khaki);
  --color-muted: var(--color-espresso);   /* Cocoa is 3.8:1 here */
  --color-accent: var(--color-espresso);
  --color-line: var(--color-camel);
  --color-plate: var(--color-linen);
}
```

Every `text-muted` / `text-accent` inside adjusts automatically. All eight text
pairings on the site clear AA; the audit lives in the build notes.

### Paintings, not swatches

Each artwork carries a single `tone` — a real pigment (burnt sienna, indigo,
Payne’s grey, terre verte) — rendered by `Plate` as a lit, canvas-woven field
behind a hairline. Photography placeholders (studio shots, social grid, portrait)
stay neutral: only the artwork is allowed strong colour.

## Two things to wire up before launch

**1. Real photography.** Every artwork currently renders as a painterly CSS
gradient through `src/components/Plate.tsx`. That component is the single swap
point: add an `image` field to the `Artwork` type and render `next/image` inside
`Plate` when it is present — no page or card needs to change.

**2. Enquiry delivery.** `src/app/api/enquiry/route.ts` validates every
submission and logs it. The marked line is where to call Resend, Postmark,
SendGrid or a Sheets webhook so enquiries actually reach an inbox. Contact,
commission, newsletter and bag checkout all post through it.

## The bag

Paintings are one-of-one, so the bag holds each work at most once and has no
quantities (`src/context/CartContext.tsx`). It persists to `localStorage` and
degrades quietly when storage is blocked. Checkout is an enquiry, not a payment:
it posts the selection to `/api/enquiry` so the artist can invoice and quote
crating. To take payment instead, swap the drawer's submit handler for a Stripe
Checkout session.

## Accessibility & motion

`prefers-reduced-motion` is honoured globally in `globals.css` and per-component
via Framer's `useReducedMotion` — the hero and quote rotators stop advancing
rather than just animating faster. Entrance animations have a `<noscript>`
fallback so content stays readable without JavaScript.
