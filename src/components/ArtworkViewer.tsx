"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Plate } from "@/components/Plate";
import {
  imageFor,
  plateAlt,
  primaryImage,
  type Artwork,
  type ImageRole,
} from "@/lib/artworks";

/** The three supporting views the detail page shows beneath the main plate. */
const DETAIL_VIEWS: { role: ImageRole; label: string; origin: string }[] = [
  { role: "detail", label: "Surface detail", origin: "28% 26%" },
  { role: "in-situ", label: "On the studio wall", origin: "50% 50%" },
  { role: "verso", label: "Signature & verso", origin: "78% 74%" },
];

/**
 * Click to zoom, then move the pointer to pan across the surface — the gesture
 * collectors expect from a gallery viewer. Works on the photograph when one
 * exists, and on the pigment field when it does not.
 */
export function ArtworkViewer({ artwork }: { artwork: Artwork }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frame = useRef<HTMLDivElement>(null);

  const primary = primaryImage(artwork);

  const track = (e: React.MouseEvent) => {
    if (!zoomed || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <div
        ref={frame}
        role="button"
        tabIndex={0}
        aria-label={zoomed ? "Zoom out" : "Zoom in to see the surface"}
        onClick={() => setZoomed((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setZoomed((v) => !v);
          }
        }}
        onMouseMove={track}
        onMouseLeave={() => setZoomed(false)}
        className={zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
      >
        <Plate tone={artwork.tone} ratio={artwork.ratio}>
          {/* The zooming layer sits over the plate so the frame and aspect
              ratio stay put while this one scales and pans. */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              backgroundColor: primary ? undefined : artwork.tone,
              transformOrigin: origin,
              transform: zoomed ? "scale(2.2)" : "scale(1)",
            }}
          >
            {primary && (
              <Image
                src={primary.url}
                alt={plateAlt(artwork)}
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            )}
          </div>
          <span className="pointer-events-none absolute bottom-3.5 right-3.5 z-[3] bg-canvas/92 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.22em]">
            {zoomed ? "Move to pan · click to exit" : "Click to zoom"}
          </span>
        </Plate>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {DETAIL_VIEWS.map((view) => {
          const shot = imageFor(artwork, view.role);
          return (
            <div
              key={view.role}
              className="painting relative aspect-square overflow-hidden border border-line"
              style={{ backgroundColor: artwork.tone }}
            >
              {shot ? (
                <Image
                  src={shot.url}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1100px) 33vw, 16vw"
                  className="object-cover"
                />
              ) : (
                /* No supporting photograph yet — show a crop of the primary,
                   and failing that the pigment on its own. */
                primary && (
                  <Image
                    src={primary.url}
                    alt={`${artwork.title} — ${view.label.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1100px) 33vw, 16vw"
                    className="scale-[2.2] object-cover"
                    style={{ transformOrigin: view.origin }}
                  />
                )
              )}
              <span className="absolute bottom-[7px] left-2 z-[3] bg-canvas/90 px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.18em]">
                {view.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
