# -*- coding: utf-8 -*-
"""Generate placeholder painting and studio photography.

Every image is derived deterministically from the work's slug and pigment, so
rebuilds are stable and each painting keeps the colour the site already uses for
it. These stand in until real studio photography exists.
"""
import colorsys
import hashlib
import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def seed_for(name: str) -> int:
    return int(hashlib.sha256(name.encode()).hexdigest()[:8], 16)


def hex_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def shift(rgb, dh=0.0, ds=0.0, dv=0.0):
    r, g, b = [c / 255 for c in rgb]
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    h = (h + dh) % 1.0
    s = min(1.0, max(0.0, s + ds))
    v = min(1.0, max(0.0, v + dv))
    return tuple(int(c * 255) for c in colorsys.hsv_to_rgb(h, s, v))


def ratio_size(ratio: str, long_edge=1800):
    a, b = [float(x) for x in ratio.split("/")]
    if a >= b:
        return long_edge, int(long_edge * b / a)
    return int(long_edge * a / b), long_edge


def wash(size, colour, rng, count, blur, alpha_range, scale):
    """A layer of soft, overlapping colour fields."""
    W, H = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        cx, cy = rng.uniform(-0.1, 1.1) * W, rng.uniform(-0.1, 1.1) * H
        rw = rng.uniform(*scale) * W
        rh = rng.uniform(*scale) * H
        c = shift(
            colour,
            dh=rng.uniform(-0.05, 0.05),
            ds=rng.uniform(-0.22, 0.18),
            dv=rng.uniform(-0.28, 0.30),
        )
        a = int(rng.uniform(*alpha_range) * 255)
        d.ellipse([cx - rw / 2, cy - rh / 2, cx + rw / 2, cy + rh / 2], fill=c + (a,))
    return layer.filter(ImageFilter.GaussianBlur(blur))


def strokes(size, colour, rng, count, width_range, blur, alpha_range):
    """Directional brush marks, all raking the same way like a loaded brush."""
    W, H = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    base_angle = rng.uniform(-0.5, 0.5)
    for _ in range(count):
        ang = base_angle + rng.uniform(-0.28, 0.28)
        length = rng.uniform(0.25, 0.85) * max(W, H)
        w = rng.uniform(*width_range) * min(W, H)
        cx, cy = rng.uniform(0, W), rng.uniform(0, H)
        dx, dy = math.cos(ang) * length / 2, math.sin(ang) * length / 2
        c = shift(
            colour,
            dh=rng.uniform(-0.04, 0.04),
            ds=rng.uniform(-0.3, 0.1),
            dv=rng.uniform(-0.2, 0.34),
        )
        a = int(rng.uniform(*alpha_range) * 255)
        s = Image.new("RGBA", size, (0, 0, 0, 0))
        ImageDraw.Draw(s).line(
            [(cx - dx, cy - dy), (cx + dx, cy + dy)], fill=c + (a,), width=int(w)
        )
        layer = Image.alpha_composite(layer, s.filter(ImageFilter.GaussianBlur(blur)))
    return layer


def canvas_grain(size, rng, strength=14):
    W, H = size
    n = np.asarray(
        Image.fromarray(
            (rng.integers(0, 255, (H // 2, W // 2), dtype=np.uint8))
        ).resize((W, H), Image.BILINEAR),
        dtype=np.float32,
    )
    # Weave: bias the noise along both axes so it reads as linen, not TV static.
    xs = np.sin(np.arange(W) * math.pi / 2.2)[None, :] * 6
    ys = np.sin(np.arange(H) * math.pi / 2.2)[:, None] * 6
    return ((n - 128) / 128 * strength) + xs + ys


def vignette(size, amount=0.30):
    W, H = size
    y, x = np.mgrid[0:H, 0:W]
    cx, cy = W / 2, H / 2
    r = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2) / math.sqrt(2)
    return 1.0 - (r**2.2) * amount


def painting(slug: str, tone: str, ratio: str, long_edge=1800) -> Image.Image:
    rng = random.Random(seed_for(slug))
    nrng = np.random.default_rng(seed_for(slug))
    size = ratio_size(ratio, long_edge)
    base = hex_rgb(tone)

    img = Image.new("RGBA", size, shift(base, dv=-0.06) + (255,))
    img = Image.alpha_composite(
        img, wash(size, base, rng, 9, long_edge * 0.10, (0.25, 0.55), (0.5, 1.5))
    )
    img = Image.alpha_composite(
        img, wash(size, base, rng, 14, long_edge * 0.045, (0.12, 0.34), (0.15, 0.7))
    )
    img = Image.alpha_composite(
        img, strokes(size, base, rng, 22, (0.012, 0.075), long_edge * 0.012, (0.10, 0.34))
    )
    img = Image.alpha_composite(
        img, strokes(size, base, rng, 14, (0.004, 0.022), long_edge * 0.004, (0.14, 0.42))
    )

    a = np.asarray(img.convert("RGB"), dtype=np.float32)
    a += canvas_grain(size, nrng, 11)[:, :, None]
    a *= vignette(size, 0.26)[:, :, None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def studio(name: str, tone: str, ratio: str, long_edge=1500) -> Image.Image:
    """A studio interior: wall, floor, a window, canvases leaning.

    Kept deliberately structured — edges, a floor line, mullions — because a
    heavily blurred field reads as a smudge rather than as a photograph.
    """
    rng = random.Random(seed_for(name))
    nrng = np.random.default_rng(seed_for(name))
    size = ratio_size(ratio, long_edge)
    W, H = size
    base = hex_rgb(tone)

    img = Image.new("RGB", size, shift(base, dv=-0.10))
    d = ImageDraw.Draw(img)

    # Floor, so the frame has a ground plane.
    horizon = int(H * rng.uniform(0.62, 0.78))
    d.rectangle([0, horizon, W, H], fill=shift(base, dv=-0.26, ds=0.04))
    d.line([(0, horizon), (W, horizon)], fill=shift(base, dv=-0.36), width=max(2, W // 400))

    # Window: frame, panes, mullions, and the light it throws on the floor.
    wx = int(rng.uniform(0.06, 0.52) * W)
    wy = int(rng.uniform(0.06, 0.16) * H)
    ww = int(rng.uniform(0.24, 0.36) * W)
    wh = int(rng.uniform(0.34, 0.46) * H)
    glass = shift(base, dv=0.46, ds=-0.42)
    d.rectangle([wx, wy, wx + ww, wy + wh], fill=glass)
    bar = max(3, W // 220)
    d.line([(wx + ww // 2, wy), (wx + ww // 2, wy + wh)], fill=shift(base, dv=-0.2), width=bar)
    d.line([(wx, wy + wh // 2), (wx + ww, wy + wh // 2)], fill=shift(base, dv=-0.2), width=bar)
    d.rectangle([wx, wy, wx + ww, wy + wh], outline=shift(base, dv=-0.3), width=bar + 1)

    pool = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(pool).polygon(
        [(wx + ww * 0.1, horizon), (wx + ww * 1.5, horizon),
         (wx + ww * 2.0, H), (wx - ww * 0.2, H)],
        fill=shift(base, dv=0.30, ds=-0.3) + (120,),
    )
    img = Image.alpha_composite(
        img.convert("RGBA"), pool.filter(ImageFilter.GaussianBlur(long_edge * 0.035))
    ).convert("RGB")
    d = ImageDraw.Draw(img)

    # Canvases leaning against the wall, with visible edges.
    for _ in range(rng.randint(2, 4)):
        cw = int(rng.uniform(0.12, 0.30) * W)
        ch = int(rng.uniform(0.30, 0.62) * H)
        cx = int(rng.uniform(0.02, 0.92) * W) - cw // 2
        top = horizon - ch
        face = shift(base, dv=rng.uniform(-0.16, 0.20), ds=rng.uniform(-0.12, 0.20))
        d.polygon(
            [(cx, top), (cx + cw, top - int(ch * 0.04)),
             (cx + cw, horizon), (cx, horizon + int(ch * 0.02))],
            fill=face,
        )
        d.line([(cx, top), (cx, horizon + int(ch * 0.02))],
               fill=shift(base, dv=-0.34), width=max(2, W // 350))

    # Depth of field: soften the back of the room, keep the front crisp.
    blurred = img.filter(ImageFilter.GaussianBlur(long_edge * 0.010))
    grad = np.linspace(1.0, 0.0, H)[:, None, None]
    a = (np.asarray(blurred, np.float32) * grad
         + np.asarray(img, np.float32) * (1 - grad))

    a += canvas_grain(size, nrng, 6)[:, :, None]
    a *= vignette(size, 0.34)[:, :, None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def save(img: Image.Image, path: str, quality=86):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    return os.path.getsize(path)
