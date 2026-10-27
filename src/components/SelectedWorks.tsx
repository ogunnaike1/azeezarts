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
import {
  formatPrice,
  plateAlt,
  primaryImage,
  type Artwork,
} from "@/lib/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The featured works as a pinned gallery. The page stops, and scrolling slides
 * a rail of paintings past a fixed focal point: the one in focus swells and
 * straightens while its neighbours recede, and the title, details and number
 * on the left change with it. The scroll is the only control.
 */
export function SelectedWorks({ works }: { works: Artwork[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Card centres along the rail, and the width of the viewport it slides in.
  const layout = useRef({ centers: [] as number[], width: 0 });
  const measured = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.5,
  });

  const last = works.length - 1;
  // Which work is in focus, as a fractional index: 2.5 is half way from the
  // third painting to the fourth.
  const position = useTransform(progress, (p) => p * last);

  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      layout.current = {
        centers: cardRefs.current.map((el) =>
          el ? el.offsetLeft + el.offsetWidth / 2 : 0,
        ),
        width: rail.parentElement?.clientWidth ?? window.innerWidth,
      };
      measured.set(measured.get() + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (railRef.current) observer.observe(railRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced, measured, works.length]);

  const railX = useTransform(() => {
    // Both are read before anything can return early, so the transform is
    // always subscribed to the scroll and to a fresh measurement.
    measured.get();
    const pos = position.get();
    const { centers, width } = layout.current;
    if (!centers.length) return 0;
    const i = Math.min(last - 1, Math.max(0, Math.floor(pos)));
    const centre = lerp(centers[i], centers[i + 1] ?? centers[i], pos - i);
    return width / 2 - centre;
  });
  const rule = useTransform(progress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section className="shell py-[clamp(70px,9vw,130px)]">
        <h2 className="m-0 mb-10 font-display text-[clamp(28px,3.6vw,54px)] tracking-[-0.01em]">
          Selected works
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3.2vw,54px)]">
          {works.map((work) => (
            <ArtworkCard key={work.slug} artwork={work} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      style={{ height: `calc(var(--hh) + ${last * 85}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[var(--hh)] flex-col overflow-hidden pt-[clamp(96px,13vh,130px)]">
        <div className="shell">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 pb-4">
            <h2 className="m-0 font-display text-[clamp(26px,3.2vw,48px)] tracking-[-0.01em]">
              Selected works
            </h2>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-muted">
              2023 — 2026 · Oil &amp; mixed media
            </span>
          </div>
          {/* The rule is the scrollbar for this section. */}
          <div className="relative h-px bg-line">
            <motion.div
              style={{ scaleX: rule }}
              className="absolute inset-0 origin-left bg-ink"
            />
          </div>
        </div>

        <div className="relative flex-1">
          {/* The rail of paintings. On wide screens it keeps to the right of
              the details and fades out before reaching them. */}
          <div className="absolute inset-x-0 bottom-[190px] top-0 lg:bottom-0 lg:left-[38%] lg:[mask-image:linear-gradient(to_right,transparent,#000_16%)]">
            <motion.div
              ref={railRef}
              style={{ x: railX }}
              className="absolute left-0 top-1/2 flex w-max -translate-y-1/2 items-center gap-[clamp(28px,5vw,90px)]"
            >
              {works.map((work, i) => (
                <RailCard
                  key={work.slug}
                  work={work}
                  index={i}
                  position={position}
                  setRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* The details of whichever work is in focus. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 lg:inset-y-0 lg:right-auto lg:w-[40%]">
            <div className="shell relative grid h-full items-end pb-[clamp(20px,4vh,40px)] lg:items-center lg:pb-0">
              {works.map((work, i) => (
                <Details
                  key={work.slug}
                  work={work}
                  index={i}
                  total={works.length}
                  position={position}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailCard({
  work,
  index,
  position,
  setRef,
}: {
  work: Artwork;
  index: number;
  position: MotionValue<number>;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const image = primaryImage(work);
  // Distance from focus, 0 when this painting is the one being shown.
  const near = useTransform(position, (p) => Math.min(1, Math.abs(p - index)));
  const scale = useTransform(near, (n) => 1 - 0.16 * n);
  const opacity = useTransform(near, (n) => 1 - 0.6 * n);
  const rotate = useTransform(position, (p) => (index - p) * 3);
  const drift = useTransform(position, (p) => `${(index - p) * -9}%`);

  return (
    <motion.div
      ref={setRef}
      style={{ scale, opacity, rotate, aspectRatio: work.ratio }}
      className="relative h-[clamp(240px,50vh,560px)] shrink-0"
    >
      <Link
        href={`/works/${work.slug}`}
        aria-label={`${work.title} — view artwork`}
        className="painting frame group absolute inset-0 block overflow-hidden shadow-[0_40px_70px_-40px_rgba(74,52,42,0.55)]"
        style={{ backgroundColor: work.tone }}
      >
        {image && (
          // Over-sized and counter-slid, so the painting moves inside its own
          // frame: a window on the work, not a sticker on the page.
          <motion.div
            style={{ x: drift }}
            className="absolute inset-0 scale-[1.22]"
          >
            <Image
              src={image.url}
              alt={plateAlt(work)}
              fill
              sizes="(max-width: 700px) 60vw, 34vw"
              className="object-cover"
            />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

function Details({
  work,
  index,
  total,
  position,
}: {
  work: Artwork;
  index: number;
  total: number;
  position: MotionValue<number>;
}) {
  const near = useTransform(position, (p) => Math.min(1, Math.abs(p - index)));
  const opacity = useTransform(near, (n) => Math.max(0, 1 - n * 2.2));
  const y = useTransform(position, (p) => (index - p) * 36);
  const live = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: live }}
      className="col-start-1 row-start-1 max-lg:text-center"
    >
      <span
        aria-hidden
        className="hidden font-display text-[clamp(90px,13vw,200px)] leading-[0.8] tracking-[-0.04em] text-khaki lg:block"
      >
        {pad(index + 1)}
      </span>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent lg:mt-7">
        <span className="lg:hidden">{pad(index + 1)} / {pad(total)} · </span>
        {work.series}
      </div>
      <h3 className="mb-0 mt-3 font-display text-[clamp(26px,3.6vw,56px)] leading-[1.02] tracking-[-0.02em]">
        {work.title}
      </h3>
      <p className="mt-4 text-[13px] font-light leading-[1.7] text-ink-soft">
        {work.year} · {work.medium} · {work.dims}
      </p>
      <div className="mt-5 flex items-center gap-6 max-lg:justify-center">
        <span className="font-display text-[22px]">{formatPrice(work.price)}</span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted">
          {work.status}
        </span>
      </div>
      <Link
        href={`/works/${work.slug}`}
        className="link-underline mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.26em]"
      >
        View artwork →
      </Link>
    </motion.div>
  );
}
