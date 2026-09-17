# -*- coding: utf-8 -*-
"""Regenerate *synthetic* placeholder art.

NOTE: the images currently in public/artwork and public/studio are public-domain
paintings from Wikimedia Commons, not output from this script. Running it will
overwrite them. Kept only as a fallback for offline work.


    pip install pillow numpy
    python scripts/generate_placeholders.py

Reads slug / ratio / tone straight out of src/lib/artworks.ts, so adding a work
there and re-running is all it takes. Output is deterministic per slug: the same
work always produces the same image.

Delete public/artwork and public/studio once real photography exists.
"""
import re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from placeholder_art import painting, studio, save  # noqa: E402

src = open("src/lib/artworks.ts", encoding="utf-8").read()
works = []
for m in re.finditer(
    r'slug:\s*"([^"]+)".*?ratio:\s*"([^"]+)".*?tone:\s*"([^"]+)"', src, re.S
):
    works.append({"slug": m.group(1), "ratio": m.group(2), "tone": m.group(3)})

total = 0
for w in works:
    img = painting(w["slug"], w["tone"], w["ratio"])
    p = f"public/artwork/{w['slug']}.jpg"
    n = save(img, p)
    total += n
    print(f"  {img.size[0]:>4}x{img.size[1]:<4} {n/1024:>6.0f}KB  {p}")

STUDIO = [
    ("portrait",      "#d9d2c5", "3 / 4"),
    ("easel",         "#ded7ca", "4 / 5"),
    ("palette",       "#ded7ca", "3 / 4"),
    ("linen",         "#d3cbbc", "1 / 1"),
    ("studies-wall",  "#e3ddd1", "1 / 1"),
    ("north-window",  "#cbc2b1", "3 / 4"),
    ("social-1",      "#ddd6c9", "1 / 1"),
    ("social-2",      "#d2cabb", "1 / 1"),
    ("social-3",      "#e4ded2", "1 / 1"),
    ("social-4",      "#d8d0c1", "1 / 1"),
    ("social-5",      "#cec5b4", "1 / 1"),
    ("social-6",      "#e0d9cc", "1 / 1"),
]
for name, tone, ratio in STUDIO:
    img = studio(name, tone, ratio)
    p = f"public/studio/{name}.jpg"
    n = save(img, p)
    total += n
    print(f"  {img.size[0]:>4}x{img.size[1]:<4} {n/1024:>6.0f}KB  {p}")

print(f"\n{len(works)} paintings + {len(STUDIO)} studio shots = {total/1024/1024:.1f}MB")
