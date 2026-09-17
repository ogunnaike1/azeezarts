"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { artworks, plateAlt, primaryImage } from "@/lib/artworks";
import { heroSlugs } from "@/lib/site";

const DURATION = 7000;

const slides = heroSlugs
  .map((slug) => artworks.find((a) => a.slug === slug))
  .filter((a): a is NonNullable<typeof a> => Boolean(a));

/**
 * Full-bleed carousel. The painting fills the viewport and a double scrim —
 * raking left-to-right, then up from the base — keeps the type legible over
 * any pigment, light or dark.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useReducedMotion();
  const work = slides[index];
  const next = slides[(index + 1) % slides.length];

  const go = useCallback((to: number) => {
    setIndex((to + slides.length) % slides.length);
    setElapsed(0);
  }, []);

  // One tick drives both the advance and the progress rule, so the bar and the
  // slide can never drift apart.
  useEffect(() => {
    if (reduced) return;
    const step = 50;
    const timer = window.setInterval(() => {
      setElapsed((value) => {
        if (value + step >= DURATION) {
          setIndex((i) => (i + 1) % slides.length);
          return 0;
        }
        return value + step;
      });
    }, step);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden bg-espresso">
      <AnimatePresence initial={false}>
        <motion.div
          key={work.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="painting absolute inset-0"
            style={{ backgroundColor: work.tone }}
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 9, ease: [0.2, 0, 0.2, 1] }}
          >
            {primaryImage(work) && (
              <Image
                src={primaryImage(work)!.url}
                alt={plateAlt(work)}
                fill
                sizes="100vw"
                // The hero is the largest paint on first load, so the first
                // slide is preloaded rather than lazily fetched.
                priority={index === 0}
                quality={82}
                className="object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 z-[3] bg-[linear-gradient(100deg,rgba(74,52,42,.86)_0%,rgba(74,52,42,.58)_46%,rgba(74,52,42,.3)_100%)]" />
          <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_top,rgba(74,52,42,.58)_0%,rgba(74,52,42,0)_55%)]" />
        </motion.div>
      </AnimatePresence>

      <span className="absolute bottom-[clamp(120px,16vh,180px)] right-[clamp(20px,4vw,64px)] z-10 hidden font-mono text-[9.5px] uppercase tracking-[0.28em] text-canvas [writing-mode:vertical-rl] md:block">
        {work.medium}
      </span>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="shell">
          <div className="max-w-[760px]">
            <motion.div
              key={`${work.slug}-label`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <span className="shrink-0 font-mono text-[10.5px] tracking-[0.3em] whitespace-nowrap text-khaki">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
              <span className="h-px w-11 shrink-0 bg-canvas/40" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.3em] whitespace-nowrap text-canvas/92">
                {work.series}
              </span>
            </motion.div>

            <motion.h1
              key={`${work.slug}-title`}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-[clamp(46px,8.4vw,124px)] leading-[0.94] tracking-[-0.02em] text-canvas"
            >
              {work.title}
            </motion.h1>

            <motion.p
              key={`${work.slug}-desc`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[430px] text-[clamp(14px,1.15vw,16.5px)] font-light leading-[1.75] text-canvas/94"
            >
              {work.story}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 flex flex-wrap gap-3.5"
            >
              <Link
                href={`/works/${work.slug}`}
                className="btn group bg-canvas text-ink hover:bg-accent hover:text-canvas"
              >
                View artwork
                <span className="font-mono">→</span>
              </Link>
              <Link
                href="/shop"
                className="btn border-canvas/60 bg-espresso/45 text-canvas hover:border-canvas hover:bg-canvas/14"
              >
                Shop collection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-[clamp(20px,4vw,64px)] pb-[30px]">
        <div className="mx-auto flex max-w-[1680px] items-end justify-between gap-5">
          <div className="max-w-[420px] flex-1">
            <div className="relative h-px bg-canvas/25">
              <div
                className="absolute left-0 top-0 h-px bg-khaki"
                style={{
                  width: `${reduced ? 100 : (elapsed / DURATION) * 100}%`,
                  transition: "width 50ms linear",
                }}
              />
            </div>
            <p className="mt-3.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-canvas/60">
              Next — {next.title}
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous work"
              className="h-[52px] w-[52px] cursor-pointer border border-canvas/40 font-mono text-[14px] text-canvas transition-colors duration-500 hover:border-canvas hover:bg-canvas/14"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next work"
              className="h-[52px] w-[52px] cursor-pointer border border-canvas/40 font-mono text-[14px] text-canvas transition-colors duration-500 hover:border-canvas hover:bg-canvas/14"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
