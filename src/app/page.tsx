import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ArtworkCard } from "@/components/ArtworkCard";
import { QuoteRotator } from "@/components/QuoteRotator";
import { getFeatured } from "@/lib/artworks";
import { PhotoSlot } from "@/components/PhotoSlot";
import { socialGrid, studioPortrait, studioStats } from "@/lib/site";

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Hero />

      {/* Statement */}
      <section className="shell pt-[clamp(80px,11vw,160px)]">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-end gap-[clamp(30px,5vw,80px)]">
          <p className="m-0 max-w-[16em] font-display text-[clamp(26px,3.1vw,44px)] leading-[1.24] tracking-[-0.01em]">
            Painting the spaces between memory and emotion — in oil, pigment and
            quiet light.
          </p>
          <div className="flex max-w-[34em] flex-col gap-4">
            <span className="eyebrow text-accent">Studio note</span>
            <p className="m-0 text-[15px] font-light leading-[1.85] text-ink-soft">
              Each canvas begins as a fragment — a half-remembered room, a
              gesture, the weight of afternoon. I work slowly, in layers, until
              the surface holds something that cannot quite be named.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Selected works */}
      <section className="shell py-[clamp(70px,9vw,130px)]">
        <div className="mb-[clamp(36px,5vw,64px)] flex flex-wrap items-baseline justify-between gap-5 border-b border-line pb-5">
          <h2 className="m-0 font-display text-[clamp(28px,3.6vw,54px)] tracking-[-0.01em]">
            Selected works
          </h2>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-muted">
            2023 — 2026 · Oil &amp; mixed media
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-[clamp(24px,3.2vw,54px)]">
          {featured.map((artwork, i) => (
            <Reveal key={artwork.slug} delay={i * 0.08}>
              {/* Staggered baselines give the grid a hung-salon rhythm. */}
              <ArtworkCard
                artwork={artwork}
                className={i % 2 === 1 ? "lg:mt-14" : ""}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(50px,6vw,90px)] flex justify-center">
          <Link
            href="/works"
            className="btn btn-outline group"
          >
            View all works
            <span className="font-mono transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Studio */}
      <section className="overflow-hidden band py-[clamp(70px,9vw,140px)]">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(30px,5vw,90px)]">
          <Reveal>
            <PhotoSlot
              {...studioPortrait}
              sizes="(max-width: 1000px) 100vw, 46vw"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow text-accent">The studio</span>
            <h2 className="mt-5 font-display text-[clamp(30px,4.2vw,62px)] leading-[1.06] tracking-[-0.015em]">
              A slow
              <br />
              conversation
              <br />
              with the surface
            </h2>
            <p className="mt-6 max-w-[36em] text-[15px] font-light leading-[1.85] text-ink-soft">
              Mornings are for mixing — earth pigments, lead white, a little cold
              wax. The painting is turned to the wall for weeks at a time, then
              returned to. Nothing leaves the studio until it feels inevitable.
            </p>
            <dl className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6 border-t border-line-soft pt-7">
              {studioStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="m-0">
                    <span className="block font-display text-[34px] leading-none">
                      {stat.value}
                    </span>
                    <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Collectors */}
      <section className="shell py-[clamp(80px,10vw,150px)]">
        <Reveal>
          <QuoteRotator />
        </Reveal>
      </section>

      {/* From the studio */}
      <section className="border-t border-line py-[clamp(60px,8vw,110px)]">
        <div className="shell">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 font-display text-[clamp(24px,2.8vw,38px)]">
              From the studio
            </h2>
            <Link
              href="/contact"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              Follow the artist →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
            {socialGrid.map((shot) => (
              <PhotoSlot
                key={shot.label}
                {...shot}
                ratio="1 / 1"
                hover
                sizes="(max-width: 700px) 50vw, 16vw"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
