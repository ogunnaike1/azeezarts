import Link from "next/link";
import { Plate } from "@/components/Plate";
import {
  formatPrice,
  plateAlt,
  primaryImage,
  type Artwork,
} from "@/lib/artworks";

/** Status is carried by weight, not by a third colour. */
const statusTone: Record<Artwork["status"], string> = {
  Available: "text-accent",
  Reserved: "text-ink-soft",
  Sold: "text-muted",
};

export function ArtworkCard({
  artwork,
  className = "",
  showPrice = true,
}: {
  artwork: Artwork;
  className?: string;
  showPrice?: boolean;
}) {
  return (
    <Link href={`/works/${artwork.slug}`} className={`group block ${className}`}>
      <Plate
        tone={artwork.tone}
        src={primaryImage(artwork)?.url}
        alt={plateAlt(artwork)}
        ratio={artwork.ratio}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        surfaceClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.055]"
      >
        <span
          className={`absolute left-4 top-4 bg-canvas/90 px-[9px] py-[5px] font-mono text-[8.5px] uppercase tracking-[0.24em] ${statusTone[artwork.status]}`}
        >
          {artwork.status}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-canvas/94 font-mono text-[13px] opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          →
        </span>
      </Plate>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-[clamp(18px,1.5vw,22px)] leading-tight transition-colors duration-500 group-hover:text-accent">
            {artwork.title}
          </h3>
          <p className="mt-[6px] text-[11.5px] font-light tracking-[0.05em] text-muted">
            {artwork.year} · {artwork.medium}
          </p>
        </div>
        {showPrice && (
          <span className="font-mono text-[11.5px] whitespace-nowrap">
            {artwork.status === "Sold" ? "Sold" : formatPrice(artwork.price)}
          </span>
        )}
      </div>
    </Link>
  );
}
