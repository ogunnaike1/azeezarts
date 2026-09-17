import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
import { artistPortrait, studioShots, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Azeez is a painter working between Lagos and Lisbon, making interiors half-dissolved by light. Biography, studio practice and exhibition history.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the artist"
        title="Painting the spaces between memory and emotion."
        size="medium"
      />

      <section className="shell py-[clamp(60px,8vw,120px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(34px,5vw,90px)]">
          <Reveal>
            <PhotoSlot
              {...artistPortrait}
              sizes="(max-width: 1000px) 100vw, 46vw"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="m-0 font-display text-[clamp(20px,2.2vw,29px)] leading-[1.45]">
              Azeez is a painter working between Lagos and Lisbon. Their
              canvases hold interiors half-dissolved by light — rooms remembered
              rather than seen.
            </p>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink-soft">
              Trained first as an architect, they came to painting through
              drawing buildings that no longer existed. That habit persists: the
              compositions are built like rooms, with weight, threshold and air.
              They work in thin oil glazes over cold-pressed linen, letting each
              layer dry for days so the colour beneath keeps breathing through.
            </p>
            <p className="mt-5 text-[15px] font-light leading-[1.9] text-ink-soft">
              Their work has been shown in Lagos, London, Lisbon and New York, and
              is held in private collections across nine countries.
            </p>

            <div className="mt-11 border-t border-line pt-7">
              <span className="eyebrow text-accent">Philosophy</span>
              <p className="mt-4 font-display text-[clamp(19px,2vw,26px)] italic leading-[1.5]">
                “I am not painting what a place looked like. I am painting what it
                was like to be there and then to leave.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band py-[clamp(60px,8vw,120px)]">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
          {studioShots.map((shot, i) => (
            <Reveal key={shot.label} delay={i * 0.08}>
              <PhotoSlot {...shot} sizes="(max-width: 700px) 50vw, 24vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-[clamp(70px,9vw,140px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(30px,4vw,80px)]">
          <div>
            <h2 className="m-0 font-display text-[clamp(28px,3.4vw,48px)] tracking-[-0.01em]">
              Exhibitions
              <br />
              &amp; journey
            </h2>
            <p className="mt-5 max-w-[26em] text-[14px] font-light leading-[1.8] text-muted">
              Selected solo and group presentations, residencies and awards.
            </p>
          </div>

          <ol className="m-0 list-none p-0">
            {timeline.map((entry, i) => (
              <Reveal as="li" key={`${entry.year}-${entry.title}`} delay={i * 0.05}>
                <div className="grid grid-cols-[72px_1fr] gap-6 border-b border-line py-7 sm:grid-cols-[88px_1fr]">
                  <span className="font-mono text-[12px] text-accent">
                    {entry.year}
                  </span>
                  <div>
                    <h3 className="m-0 font-display text-[clamp(18px,1.8vw,24px)] leading-tight">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] tracking-[0.04em] text-muted">
                      {entry.place}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
