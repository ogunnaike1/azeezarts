import Link from "next/link";
import Image from "next/image";
import {
  formatPrice,
  plateAlt,
  primaryImage,
  type Artwork,
} from "@/lib/artworks";

/** A plain, static grid of the featured works. */
export function SelectedWorks({ works }: { works: Artwork[] }) {
  return (
    <section className="shell py-[clamp(70px,9vw,130px)]">
      <h2 className="m-0 mb-10 font-display text-[clamp(28px,3.6vw,54px)] tracking-[-0.01em]">
        Selected works
      </h2>
      <div className="grid grid-cols-1 gap-x-[clamp(20px,2.6vw,40px)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => {
          const image = primaryImage(work);
          return (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              className="block"
            >
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ backgroundColor: work.tone }}
              >
                {image && (
                  <Image
                    src={image.url}
                    alt={plateAlt(work)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[20px] leading-tight">
                  {work.title}
                </h3>
                <span className="font-mono text-[12px] whitespace-nowrap text-muted">
                  {work.status === "Sold" ? "Sold" : formatPrice(work.price)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
