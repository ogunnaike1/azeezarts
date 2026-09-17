"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { quotes } from "@/lib/site";

export function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      7500,
    );
    return () => window.clearInterval(timer);
  }, [reduced]);

  const quote = quotes[index];

  return (
    <div className="mx-auto max-w-[1100px] text-center">
      <span className="eyebrow text-accent">Collectors</span>

      <div className="relative mt-8 min-h-[clamp(150px,18vw,240px)]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="m-0"
          >
            <p className="m-0 font-display text-[clamp(22px,3.4vw,46px)] italic leading-[1.3] tracking-[-0.01em]">
              “{quote.text}”
            </p>
            <footer className="mt-7 font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
              — {quote.who}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-9 flex justify-center gap-2">
        {quotes.map((q, i) => (
          <button
            key={q.who}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show quote ${i + 1}`}
            className={`h-px cursor-pointer border-0 p-0 transition-[width,background-color] duration-700 ${
              i === index ? "w-12 bg-accent" : "w-6 bg-line-soft"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
