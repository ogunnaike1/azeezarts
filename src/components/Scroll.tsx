"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-scrubbed motion for the home page. Unlike `Reveal`, which plays once
 * when something enters, these follow the scrollbar in both directions — so
 * the page feels like one continuous surface rather than a stack of sections.
 * Under reduced motion they render their children untouched.
 */

type ScrubInProps = {
  children: ReactNode;
  className?: string;
  /** Start offset in px, vertical. */
  y?: number;
  /** Start offset in px, horizontal. */
  x?: number;
  scale?: number;
  /** Reveal through a clip that opens from the bottom, in percent. */
  clip?: number;
};

/** Rises into place as it climbs from the bottom of the screen toward the middle. */
export function ScrubIn({
  children,
  className,
  y = 70,
  x = 0,
  scale = 0.94,
  clip = 0,
}: ScrubInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "start 58%"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const opacity = useTransform(p, [0, 0.6], [0, 1]);
  const ty = useTransform(p, [0, 1], [y, 0]);
  const tx = useTransform(p, [0, 1], [x, 0]);
  const s = useTransform(p, [0, 1], [scale, 1]);
  const clipPath = useTransform(p, [0, 1], [`inset(0 0 ${clip}% 0)`, "inset(0 0 0% 0)"]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y: ty, x: tx, scale: s, ...(clip ? { clipPath } : {}) }}
    >
      {children}
    </motion.div>
  );
}

/** Drifts against the scroll; positive speeds lag, negative ones run ahead. */
export function Parallax({
  children,
  className,
  speed = 0.1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 260, speed * -260]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself left to right as it comes into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "start 70%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 1]);

  return (
    <div ref={ref} className={`relative h-px ${className}`}>
      <div className="absolute inset-0 bg-line" />
      {!reduced && (
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left bg-ink"
        />
      )}
    </div>
  );
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.75;
  const opacity = useTransform(progress, [start, start + 0.25], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** A statement that darkens word by word as you read down through it. */
export function WordsReveal({
  text,
  className,
  progress,
}: {
  text: string;
  className?: string;
  /** Drive the reading from a parent's scroll instead of this element's own. */
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 52%"],
  });

  if (reduced) return <p className={className}>{text}</p>;

  const driver = progress ?? scrollYProgress;
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={driver}
        />
      ))}
    </p>
  );
}

/**
 * A thread that runs down the left margin of everything inside it, drawn by
 * the scroll, with a bead at its head. It is what ties one section to the next.
 */
export function Thread({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 55%"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const scaleY = useTransform(p, [0, 1], [0, 1]);
  const top = useTransform(p, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[140px] left-[calc(clamp(20px,4vw,64px)/2)] top-[140px] z-[5] hidden w-px -translate-x-1/2 lg:block"
        >
          <div className="absolute inset-0 bg-line-soft/40" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-0 origin-top bg-accent"
          />
          <motion.span
            style={{ top }}
            className="absolute left-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-canvas"
          />
        </div>
      )}
      {children}
    </div>
  );
}
