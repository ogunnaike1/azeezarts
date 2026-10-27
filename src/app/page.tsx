import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Parallax, ScrubIn, Thread } from "@/components/Scroll";
import { SelectedWorks } from "@/components/SelectedWorks";
import { QuoteRotator } from "@/components/QuoteRotator";
import { getFeatured } from "@/lib/artworks";
import { PhotoSlot } from "@/components/PhotoSlot";
import { socialGrid, studioPortrait, studioStats } from "@/lib/site";

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Hero />

      {/* Everything below rises over the pinned stage like a curtain, and a
          single thread, drawn by the scroll, runs down through all of it. */}
      <Thread className="z-20 -mt-[calc(var(--hh)*0.25)] rounded-t-[clamp(28px,4vw,56px)] bg-canvas shadow-[0_-40px_80px_-40px_rgba(74,52,42,0.4)]">
      {/* Selected works */}
      <SelectedWorks works={featured} />
      <div className="shell flex justify-center pb-[clamp(70px,9vw,130px)] pt-[clamp(20px,3vw,40px)]">
        <Link href="/works" className="btn btn-outline group">
          View all works
          <span className="font-mono transition-transform duration-500 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>

      {/* Studio */}
      <section className="overflow-hidden band py-[clamp(70px,9vw,140px)]">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(30px,5vw,90px)]">
          <Parallax speed={0.06}>
            <ScrubIn x={-70} y={40} clip={30} scale={0.9}>
              <PhotoSlot
                {...studioPortrait}
                sizes="(max-width: 1000px) 100vw, 46vw"
              />
            </ScrubIn>
          </Parallax>

          <ScrubIn x={70} y={40} scale={1}>
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
          </ScrubIn>
        </div>
      </section>

      {/* Collectors */}
      <section className="shell py-[clamp(80px,10vw,150px)]">
        <ScrubIn y={50} scale={0.9}>
          <QuoteRotator />
        </ScrubIn>
      </section>

      {/* From the studio */}
      <section className="border-t border-line py-[clamp(60px,8vw,110px)]">
        <div className="shell">
          <ScrubIn y={30} scale={1} className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 font-display text-[clamp(24px,2.8vw,38px)]">
              From the studio
            </h2>
            <Link
              href="/contact"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              Follow the artist →
            </Link>
          </ScrubIn>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
            {socialGrid.map((shot, i) => (
              <ScrubIn key={shot.label} y={50 + (i % 3) * 40} scale={0.88}>
                <PhotoSlot
                  {...shot}
                  ratio="1 / 1"
                  hover
                  sizes="(max-width: 700px) 50vw, 16vw"
                />
              </ScrubIn>
            ))}
          </div>
        </div>
      </section>
      </Thread>
    </>
  );
}
