import Link from "next/link";
import { Plate } from "@/components/Plate";
import { artworks, plateAlt, primaryImage } from "@/lib/artworks";
import { whatsappLink } from "@/lib/site";

/** Works painted to commission, shown as proof of what a commission looks like. */
const examples = ["the-elder", "little-one", "two-of-us"]
  .map((slug) => artworks.find((a) => a.slug === slug))
  .filter((a): a is NonNullable<typeof a> => Boolean(a));

/**
 * "Can't find the right painting? Commission one." — sits under the shop grid
 * and sends the visitor straight to a WhatsApp chat or the full request form.
 */
export function CommissionCta() {
  return (
    <section className="band py-[clamp(60px,8vw,120px)]">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(30px,5vw,80px)]">
        <div>
          <span className="eyebrow text-accent">Commissions open</span>
          <h2 className="mt-5 font-display text-[clamp(28px,3.6vw,52px)] leading-[1.06] tracking-[-0.015em]">
            Want something
            <br />
            made for you?
          </h2>
          <p className="mt-6 max-w-[34em] text-[15px] font-light leading-[1.85] text-ink-soft">
            Portraits of family and loved ones, gele portraits, landscapes and
            scenes — painted in oil from your photographs. Send a photo and an
            idea on WhatsApp and Azeez will reply with size, price and timeline.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappLink(
                "Hello Azeezarts, I would like to commission a painting. Here is what I have in mind:",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Commission on WhatsApp
            </a>
            <Link href="/commissions" className="btn btn-outline">
              How commissions work
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {examples.map((work) => (
            <Plate
              key={work.slug}
              tone={work.tone}
              src={primaryImage(work)?.url}
              alt={plateAlt(work)}
              ratio="0.8 / 1"
              sizes="(max-width: 700px) 30vw, 14vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
