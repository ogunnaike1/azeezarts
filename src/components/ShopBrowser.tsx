"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plate } from "@/components/Plate";
import { AddToBagButton } from "@/components/AddToBagButton";
import {
  artworks,
  formatPrice,
  plateAlt,
  primaryImage,
  type Artwork,
} from "@/lib/artworks";

type Availability = "All" | "Available" | "Reserved" | "Sold";
type Sort = "Newest" | "Price ↑" | "Price ↓";

const AVAILABILITY: Availability[] = ["All", "Available", "Reserved", "Sold"];
const SORTS: Sort[] = ["Newest", "Price ↑", "Price ↓"];

/** Unsold, unpriced works sort last regardless of direction. */
function priceKey(a: Artwork): number {
  return a.price ?? Number.POSITIVE_INFINITY;
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer border-b py-[6px] text-[11.5px] uppercase tracking-[0.22em] transition-colors duration-500 ${
        active
          ? "border-cocoa text-accent"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function ShopBrowser() {
  const [availability, setAvailability] = useState<Availability>("Available");
  const [sort, setSort] = useState<Sort>("Newest");

  const visible = useMemo(() => {
    const filtered = artworks.filter(
      (a) => availability === "All" || a.status === availability,
    );
    const sorted = [...filtered];
    if (sort === "Newest") sorted.sort((a, b) => b.year - a.year);
    if (sort === "Price ↑") sorted.sort((a, b) => priceKey(a) - priceKey(b));
    if (sort === "Price ↓") sorted.sort((a, b) => priceKey(b) - priceKey(a));
    return sorted;
  }, [availability, sort]);

  return (
    <>
      <div className="shell">
        <div className="mt-[clamp(40px,5vw,70px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-line pb-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="micro text-muted">Show</span>
            {AVAILABILITY.map((a) => (
              <Pill
                key={a}
                label={a}
                active={availability === a}
                onClick={() => setAvailability(a)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="micro text-muted">Sort</span>
            {SORTS.map((s) => (
              <Pill
                key={s}
                label={s}
                active={sort === s}
                onClick={() => setSort(s)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="shell pb-[clamp(70px,9vw,130px)] pt-[clamp(34px,4.5vw,64px)]">
        {visible.length === 0 ? (
          <p className="py-20 text-center font-display text-[clamp(22px,3vw,32px)]">
            Nothing in that category right now — commissions are open.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(26px,3.4vw,56px)]">
            {visible.map((artwork, i) => (
              <motion.article
                key={artwork.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: Math.min(i * 0.05, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col"
              >
                <Link href={`/works/${artwork.slug}`} className="group block">
                  <Plate
                    tone={artwork.tone}
                    src={primaryImage(artwork)?.url}
                    alt={plateAlt(artwork)}
                    ratio={artwork.ratio}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    surfaceClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
                  >
                    <span className="absolute left-[14px] top-[14px] bg-canvas/92 px-[9px] py-[5px] font-mono text-[8.5px] uppercase tracking-[0.24em] text-muted">
                      {artwork.status}
                    </span>
                  </Plate>
                </Link>

                <div className="mt-4 flex items-baseline justify-between gap-3.5">
                  <div>
                    <h3 className="font-display text-[21px] leading-tight">
                      <Link
                        href={`/works/${artwork.slug}`}
                        className="transition-colors duration-400 hover:text-accent"
                      >
                        {artwork.title}
                      </Link>
                    </h3>
                    <p className="mt-[6px] text-[11.5px] font-light tracking-[0.05em] text-muted">
                      {artwork.dims}
                    </p>
                  </div>
                  <span className="font-mono text-[12.5px] whitespace-nowrap">
                    {artwork.status === "Sold"
                      ? "Sold"
                      : formatPrice(artwork.price)}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <AddToBagButton artwork={artwork} />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
