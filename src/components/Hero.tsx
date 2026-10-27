"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { artworks, plateAlt, primaryImage, type Artwork } from "@/lib/artworks";
import { heroSlugs } from "@/lib/site";
import { WordsReveal } from "@/components/Scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

const works = heroSlugs
  .map((slug) => artworks.find((a) => a.slug === slug))
  .filter((a): a is Artwork => Boolean(a));

/**
 * Where each painting hangs on the arc, by distance from the crown. Positions
 * are in card widths (`--w`) so the whole fan scales as one object: `x` from
 * the centre line, `y` to the card's centre from the top, `rot` in degrees.
 */
const ARC = [
  { x: 0, y: 1.42, rot: 0 },
  { x: 1.34, y: 1.78, rot: 29 },
  { x: 2.16, y: 2.78, rot: 58 },
  { x: 2.58, y: 4.0, rot: 0 },
];

/**
 * Where each painting ends up once the fan has opened out: hung as framed
 * works around the statement. Indexed left to right, same units as `ARC`.
 */
const FRAMES = [
  { x: -1.7, y: 4.2, rot: -4, scale: 0.7 },
  { x: -3.0, y: 3.3, rot: 5, scale: 1 },
  { x: -2.7, y: 1.5, rot: -8, scale: 0.9 },
  { x: 0, y: 1.0, rot: 0, scale: 0.7 },
  { x: 2.7, y: 1.2, rot: 7, scale: 0.8 },
  { x: 2.8, y: 3.4, rot: -6, scale: 0.95 },
  { x: 1.5, y: 4.3, rot: 5, scale: 0.65 },
];

const LINES = ["Paintings of rooms", "remembered, never", "quite seen."];

const STATEMENT =
  "Painting the spaces between memory and emotion — in oil, pigment and quiet light.";

/** 0 → 1 across [from, to] of the scroll, eased, and held outside it. */
function seg(p: number, from: number, to: number) {
  const t = Math.min(1, Math.max(0, (p - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Card size and how much of the frame layout fits the viewport, kept live. */
function useMetrics() {
  const w = useMotionValue(190);
  const fx = useMotionValue(1);
  const fy = useMotionValue(1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = Math.min(250, Math.max(92, Math.min(vw * 0.17, vh * 0.21)));
      w.set(cw);
      fx.set(Math.min(1, vw / cw / 7.4));
      fy.set(Math.min(1, Math.max(vh, 700) / cw / 4.76));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [w, fx, fy]);

  return { w, fx, fy };
}

/**
 * One continuous scroll: the fan opens, then the same seven paintings glide
 * into frames around the artist's statement, which reads itself in as they
 * land. The page below rises over the stage at the end.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const metrics = useMetrics();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Springing the raw progress takes the stepping out of wheel scrolling.
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.5,
  });

  const on = !reduced;
  const heroTextY = useTransform(progress, (p) => (on ? -110 * seg(p, 0.04, 0.3) : 0));
  const heroTextOpacity = useTransform(progress, (p) => (on ? 1 - seg(p, 0.04, 0.26) : 1));
  const statementOpacity = useTransform(progress, (p) => seg(p, 0.42, 0.55));
  const wordsProgress = useTransform(progress, (p) => seg(p, 0.5, 0.82));
  const noteOpacity = useTransform(progress, (p) => seg(p, 0.8, 0.92));
  const noteY = useTransform(progress, (p) => 24 * (1 - seg(p, 0.8, 0.92)));
  const veil = useTransform(progress, (p) => 0.16 * seg(p, 0.85, 1));

  return (
    // Three screens tall: the stage stays pinned while the scroll drives the
    // fan, then the statement, and the page below closes over its last stretch.
    <>
      <section
        ref={ref}
        className={`relative [--w:clamp(92px,min(17vw,21vh),250px)] [--lift:56px] md:[--lift:0px] ${
          on ? "h-[calc(var(--hh)*3)]" : "h-[var(--hh)]"
        }`}
      >
        <div className="sticky top-0 h-[var(--hh)] overflow-hidden bg-canvas">
          <div className="absolute inset-0">
            {works.map((work, i) => (
              <Card
                key={work.slug}
                work={work}
                index={i}
                slot={i - Math.floor(works.length / 2)}
                progress={progress}
                metrics={metrics}
                reduced={!on}
              />
            ))}
          </div>

          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="relative z-10 flex flex-col items-center px-5 pb-[clamp(60px,9vh,120px)] pt-[calc(var(--w)*2.7+var(--lift))] text-center"
          >
            <h1 className="m-0 font-display text-[clamp(34px,calc(var(--w)*0.36),84px)] leading-[1.02] tracking-[-0.025em] text-ink">
              {LINES.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.9 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.35, ease: EASE }}
              className="mt-5 max-w-[30em] text-[clamp(14px,1.1vw,16px)] font-light leading-[1.75] text-ink-soft"
            >
              Interiors half-dissolved by light, painted slowly in oil and
              pigment. Originals and commissions, made in Lagos and Lisbon.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: EASE }}
              className="mt-7 flex flex-wrap justify-center gap-3.5"
            >
              <Link href="/works" className="btn btn-primary">
                View works
                <span className="font-mono">→</span>
              </Link>
              <Link href="/commissions" className="btn btn-outline">
                Commission a painting
              </Link>
            </motion.div>
          </motion.div>

          {on && (
            <motion.div
              style={{ opacity: statementOpacity }}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            >
              <WordsReveal
                progress={wordsProgress}
                text={STATEMENT}
                className="m-0 max-w-[16em] font-display text-[clamp(26px,3.1vw,44px)] leading-[1.24] tracking-[-0.01em]"
              />
              <motion.div
                style={{ opacity: noteOpacity, y: noteY }}
                className="mt-8 flex max-w-[30em] flex-col items-center gap-3"
              >
                <span className="eyebrow text-accent">Studio note</span>
                <p className="m-0 text-[14px] font-light leading-[1.8] text-ink-soft">
                  Each canvas begins as a fragment — a half-remembered room, a
                  gesture, the weight of afternoon. I work slowly, in layers,
                  until the surface holds something that cannot quite be named.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Dims as the next section closes over it. */}
          <motion.div
            aria-hidden
            style={{ opacity: veil }}
            className="pointer-events-none absolute inset-0 z-20 bg-espresso"
          />
        </div>
      </section>

      {!on && (
        <section className="shell pt-[clamp(80px,11vw,160px)]">
          <p className="m-0 max-w-[16em] font-display text-[clamp(26px,3.1vw,44px)] leading-[1.24] tracking-[-0.01em]">
            {STATEMENT}
          </p>
        </section>
      )}
    </>
  );
}

function Card({
  work,
  index,
  slot,
  progress,
  metrics,
  reduced,
}: {
  work: Artwork;
  index: number;
  slot: number;
  progress: MotionValue<number>;
  metrics: ReturnType<typeof useMetrics>;
  reduced: boolean;
}) {
  const side = Math.sign(slot);
  const reach = Math.abs(slot);
  const arc = ARC[reach];
  const frame = FRAMES[index];
  const image = primaryImage(work);
  const { w, fx, fy } = metrics;

  // Two overlapping moves. First the arc opens out (`open`); then each card
  // travels from its place on the arc to its frame (`land`).
  const open = (p: number) => seg(p, 0, 0.36);
  const land = (p: number) => seg(p, 0.3, 0.7);

  const x = useTransform(() => {
    if (reduced) return 0;
    const p = progress.get();
    const cw = w.get();
    const spread = side * reach * 90 * open(p);
    const target = frame.x * cw * fx.get() - side * arc.x * cw;
    return lerp(spread, target, land(p));
  });
  const y = useTransform(() => {
    if (reduced) return 0;
    const p = progress.get();
    const cw = w.get();
    const lift = -(40 + reach * 60) * open(p);
    const target = (frame.y * fy.get() - arc.y) * cw;
    return lerp(lift, target, land(p));
  });
  const rotate = useTransform(() => {
    const rest = side * arc.rot;
    if (reduced) return rest;
    const p = progress.get();
    const widened = rest + side * (reach ? 6 + reach * 5 : 0) * open(p);
    return lerp(widened, frame.rot, land(p));
  });
  const scale = useTransform(() => {
    if (reduced) return 1;
    const p = progress.get();
    const swelled = 1 + (reach ? -0.1 : 0.1) * open(p);
    return lerp(swelled, frame.scale, land(p));
  });

  // The painting is matted as it lands: a khaki border grows round it and the
  // corners tighten, so a loose card becomes a hung work.
  const mat = useTransform(() => (reduced ? 0 : land(progress.get())));
  const padding = useTransform(mat, (m) => Math.max(6, w.get() * 0.045) * m);
  const radius = useTransform(mat, (m) => {
    const r = Math.min(26, Math.max(14, w.get() * 0.1));
    return lerp(r, 6, m);
  });
  const fade = useTransform(mat, (m) => 1 - m);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        left: `calc(50% + var(--w) * ${(side * arc.x - 0.5).toFixed(2)})`,
        top: `calc(var(--w) * ${arc.y} + var(--lift))`,
      }}
      className="absolute w-[var(--w)] -translate-y-1/2"
    >
      <motion.div
        // Cards rise from the crown outward, so the fan seems to open.
        initial={
          reduced
            ? false
            : { opacity: 0, y: 140, scale: 0.7, rotate: side * -24 }
        }
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.1 + reach * 0.13, ease: EASE }}
      >
        <motion.div
          style={{ padding, borderRadius: radius }}
          className="frame bg-plate shadow-[0_24px_50px_-28px_rgba(74,52,42,0.5)]"
        >
          <Link
            href={`/works/${work.slug}`}
            aria-label={`${work.title} — view artwork`}
            className="painting group relative block aspect-[0.81] overflow-hidden rounded-[inherit] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
            style={{ backgroundColor: work.tone }}
          >
            {image && (
              <Image
                src={image.url}
                alt={plateAlt(work)}
                fill
                sizes="(max-width: 700px) 30vw, 18vw"
                // The whole fan is above the fold, and any card can be the
                // largest paint, so none of them is lazy.
                priority
                className="object-cover"
              />
            )}
            {reach === 3 && (
              // The outer pair dissolve into the page until they are framed.
              <motion.span
                aria-hidden
                style={{ opacity: fade }}
                className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(to_bottom,transparent_30%,var(--color-canvas)_95%)]"
              />
            )}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
