import Image from "next/image";

type PhotoSlotProps = {
  /** Neutral ground shown until the photograph is supplied. */
  tone: string;
  src?: string;
  alt?: string;
  ratio?: string;
  sizes?: string;
  /** Caption in the corner — doubles as the brief for what to shoot. */
  label: string;
  /** Darken on hover, for the social grid. */
  hover?: boolean;
  className?: string;
};

/**
 * A photography slot: studio shots, the artist portrait, the social grid.
 *
 * Until a file exists it renders a neutral field with the caption still in
 * place, so every slot reads as "a photograph belongs here" rather than as a
 * broken image — and the page never shifts when the real one lands.
 */
export function PhotoSlot({
  tone,
  src,
  alt,
  ratio = "3 / 4",
  sizes = "(max-width: 700px) 100vw, 33vw",
  label,
  hover = false,
  className = "",
}: PhotoSlotProps) {
  return (
    <div
      className={`painting group relative overflow-hidden border border-line ${className}`}
      style={{ aspectRatio: ratio, backgroundColor: tone }}
    >
      {src && (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
      {hover && (
        <div className="absolute inset-0 z-[3] bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
      )}
      <span className="absolute bottom-2.5 left-3 z-[3] bg-canvas/88 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-ink">
        {label}
      </span>
    </div>
  );
}
