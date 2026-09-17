# Studio & portrait photography

## ⚠ Placeholders, not this studio

These are public-domain paintings of studios and interiors from Wikimedia
Commons — Courbet's atelier, Chase's studio, a Chardin still life — standing in
for photographs of the real studio. **Replace before launch.**

| File | Source work | Licence |
| --- | --- | --- |
| `easel.jpg` | Courbet LAtelier du peintre | Public domain |
| `linen.jpg` | Cornelius Norbertus Gijsbrechts - Trompe l'oeil. The Reverse of a Framed Painting - Google Art Project | Public domain |
| `north-window.jpg` | Gustave Caillebotte - Jeune homme à sa fenêtre (B 32) | Public domain |
| `palette.jpg` | Jean-Baptiste Simeon Chardin - Still life with attributes of the arts - Google Art Project | Public domain |
| `portrait.jpg` | William Merritt Chase - Studio Interior - Google Art Project | Public domain |
| `social-1.jpg` | Jan Vermeer - The Art of Painting - Google Art Project | Public domain |
| `social-2.jpg` | Bodegon con almirez, cántaro y caldero de cobre | Public domain |
| `social-3.jpg` | Still life with plaster torso, a rose and two novels - Vincent Van Gogh | Public domain |
| `social-4.jpg` | Pommes et oranges, par Paul Cézanne, Musée d'Orsay, Paris (36322958725) | Public domain |
| `social-5.jpg` | 'Interior' by Édouard Vuillard, 1904, Pushkin Museum | Public domain |
| `social-6.jpg` | Een moeder die het haar van haar kind reinigt, bekend als ‘Moedertaak’ Rijksmuseum SK-C-149 | Public domain |
| `studies-wall.jpg` | 1872 Menzel Atelierwand anagoria | Public domain |

---

## Replacing them

Referenced from the `Photo` entries in `src/lib/site.ts`. Swap `src`, update
`alt` and `ratio`, and delete `credit`.

| Entry | Slot | Suggested shot |
| --- | --- | --- |
| `artistPortrait` | About, beside the biography | Azeez in the studio, working, not posed |
| `studioPortrait` | Home, the studio band | At the easel, mid-brushstroke |
| `studioShots[0…3]` | About strip | Palette · stretched linen · wall of studies · north window |
| `socialGrid[0…5]` | Home, "From the studio" | Studio life — 6am, glaze tests, crating day, install |

Same specs as `/public/artwork`: sRGB, long edge 2000px+, JPEG or WebP.
