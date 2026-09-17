import Image from "next/image";
import type { CSSProperties } from "react";

type PlateProps = {
  /** The painting's dominant pigment — the ground, and the fallback until a
   *  photograph exists for this work. */
  tone: string;
  /** Path to the photograph. Omit and the pigment field shows instead. */
  src?: string;
  /** Required whenever `src` is set. */
  alt?: string;
  ratio?: string;
  /** Rendered width at each breakpoint, so Next picks a sane source size. */
  sizes?: string;
  /** Set on the LCP image only — the hero. */
  priority?: boolean;
  className?: string;
  /** Extra classes on the painted surface, e.g. group-hover scaling. */
  surfaceClassName?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

/**
 * Every artwork on the site renders through here.
 *
 * With `src` it renders a responsive `next/image`; without one it falls back to
 * the work's pigment as a lit, canvas-woven field. The pigment sits *behind* the
 * photograph either way, so an image fades in over its own colour instead of
 * over a grey box — and a half-photographed catalogue never looks broken.
 */
export function Plate({
  tone,
  src,
  alt,
  ratio = "4 / 5",
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
  priority = false,
  className = "",
  surfaceClassName = "",
  style,
  children,
}: PlateProps) {
  return (
    <div
      className={`relative overflow-hidden bg-plate ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <div
        className={`painting absolute inset-0 ${surfaceClassName}`}
        style={{ backgroundColor: tone }}
      >
        {src && (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
      <div className="frame pointer-events-none absolute inset-0 z-[4]" />
      {children ? <div className="absolute inset-0 z-[5]">{children}</div> : null}
    </div>
  );
}
