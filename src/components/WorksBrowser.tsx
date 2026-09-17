"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArtworkCard } from "@/components/ArtworkCard";
import {
  artworks,
  categories,
  seriesNames,
  type ArtworkCategory,
} from "@/lib/artworks";

type CategoryFilter = ArtworkCategory | "All";
type SeriesFilter = string | "All";

function FilterButton({
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
      className={`cursor-pointer border-b py-[6px] text-[11.5px] uppercase tracking-[0.24em] transition-colors duration-500 ${
        active
          ? "border-cocoa text-accent"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function WorksBrowser() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [series, setSeries] = useState<SeriesFilter>("All");

  const visible = useMemo(
    () =>
      artworks.filter(
        (a) =>
          (category === "All" || a.category === category) &&
          (series === "All" || a.series === series),
      ),
    [category, series],
  );

  return (
    <>
      <div className="shell">
        <div className="mt-[clamp(40px,5vw,70px)] flex flex-col gap-5 border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="micro w-[76px] text-muted">Subject</span>
            <FilterButton
              label="All"
              active={category === "All"}
              onClick={() => setCategory("All")}
            />
            {categories.map((c) => (
              <FilterButton
                key={c}
                label={c}
                active={category === c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="micro w-[76px] text-muted">Series</span>
            <FilterButton
              label="All"
              active={series === "All"}
              onClick={() => setSeries("All")}
            />
            {seriesNames.map((s) => (
              <FilterButton
                key={s}
                label={s}
                active={series === s}
                onClick={() => setSeries(s)}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted">
          Showing {visible.length} of {artworks.length} works
        </p>
      </div>

      <div className="shell pb-[clamp(70px,9vw,130px)] pt-[clamp(30px,4vw,54px)]">
        {visible.length === 0 ? (
          <p className="py-20 text-center font-display text-[clamp(22px,3vw,32px)]">
            No works match that combination — try widening the series.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-start gap-[clamp(24px,3vw,50px)]">
            {visible.map((artwork, i) => (
              <motion.div
                key={artwork.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: Math.min(i * 0.05, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ArtworkCard artwork={artwork} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
