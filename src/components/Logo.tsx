import { site } from "@/lib/site";

/** Intrinsic proportions of the traced monogram in public/logo.svg. */
const MARK_W = 567;
const MARK_H = 503;

type LogoProps = {
  /** Height of the mark in px; the wordmark is sized alongside it. */
  size?: number;
  /** Show the monogram alone, without the wordmark. */
  markOnly?: boolean;
  className?: string;
};

/**
 * The brand lockup.
 *
 * The monogram is painted as a CSS mask rather than an <img>, which keeps it a
 * single cached external file while still letting it take `currentColor` — so
 * it inverts to cream over the dark hero with no second asset to maintain.
 */
export function Logo({ size = 32, markOnly = false, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-3.5 ${className}`}>
      <span
        role="img"
        aria-label={markOnly ? site.name : undefined}
        aria-hidden={markOnly ? undefined : true}
        className="block shrink-0 bg-current transition-all duration-700"
        style={{
          height: size,
          width: (size * MARK_W) / MARK_H,
          maskImage: "url(/logo.svg)",
          WebkitMaskImage: "url(/logo.svg)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
      {!markOnly && (
        <span className="flex flex-col gap-[3px] leading-none">
          <span className="font-display text-[19px] uppercase tracking-[0.26em]">
            {site.name}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.34em] opacity-60">
            {site.tagline}
          </span>
        </span>
      )}
    </span>
  );
}
