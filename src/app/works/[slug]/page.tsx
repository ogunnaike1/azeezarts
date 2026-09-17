import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkViewer } from "@/components/ArtworkViewer";
import { AddToBagButton } from "@/components/AddToBagButton";
import { ArtworkCard } from "@/components/ArtworkCard";
import {
  artworks,
  formatPrice,
  getArtwork,
  getRelated,
} from "@/lib/artworks";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return { title: "Work not found" };
  return {
    title: artwork.title,
    description: `${artwork.title} (${artwork.year}) — ${artwork.medium}, ${artwork.dims}. ${artwork.story}`,
  };
}

export default async function ArtworkPage({ params }: Params) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const related = getRelated(artwork);

  const facts: [string, string][] = [
    ["Year", String(artwork.year)],
    ["Medium", artwork.medium],
    ["Dimensions", artwork.dims],
    ["Series", artwork.series],
    ["Framing", "Unframed, ready to hang"],
  ];

  return (
    <>
      <section className="shell pb-[clamp(60px,8vw,110px)] pt-[clamp(110px,13vw,180px)]">
        <Link
          href="/works"
          className="mb-[clamp(30px,4vw,52px)] inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-muted transition-colors duration-400 hover:text-accent"
        >
          ← Back to catalogue
        </Link>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(34px,5vw,84px)]">
          <ArtworkViewer artwork={artwork} />

          <div className="lg:sticky lg:top-[120px]">
            <span className="eyebrow text-accent">
              {artwork.status} · {artwork.category}
            </span>
            <h1 className="mt-4 font-display text-[clamp(34px,4.6vw,68px)] leading-[1.02] tracking-[-0.02em]">
              {artwork.title}
            </h1>
            <p className="mt-6 font-mono text-[22px]">
              {artwork.status === "Sold" ? "Sold" : formatPrice(artwork.price)}
            </p>

            <dl className="mt-9 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3.5 border-y border-line py-7 text-[13.5px]">
              {facts.map(([term, value]) => (
                <div key={term} className="contents">
                  <dt className="micro self-center text-muted">{term}</dt>
                  <dd className="m-0">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 max-w-[38em] text-[15px] font-light leading-[1.85] text-ink-soft">
              {artwork.story}
            </p>

            <div className="mt-10 flex max-w-[400px] flex-col gap-3">
              <AddToBagButton artwork={artwork} />
              <Link
                href={`/contact?work=${artwork.slug}`}
                className="btn btn-outline w-full"
              >
                Inquire about this work
              </Link>
              <Link
                href="/commissions"
                className="btn btn-quiet w-full"
              >
                Request a similar commission
              </Link>
              <p className="mt-2 text-[12px] font-light leading-[1.7] text-muted">
                Worldwide shipping in a bespoke crate · Certificate of
                authenticity · 14-day return
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell border-t border-line py-[clamp(50px,7vw,100px)]">
        <h2 className="mb-9 font-display text-[clamp(22px,2.6vw,34px)]">
          More from {artwork.series}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(20px,2.6vw,40px)]">
          {related.map((work) => (
            <ArtworkCard key={work.slug} artwork={work} showPrice={false} />
          ))}
        </div>
      </section>
    </>
  );
}
