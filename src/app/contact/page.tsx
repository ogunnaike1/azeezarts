import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about available works, commissions, press or a studio visit. Enquiries are answered personally within two working days.",
};

export default function ContactPage() {
  return (
    <section className="shell pb-[clamp(80px,10vw,150px)] pt-[clamp(130px,15vw,220px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-start gap-[clamp(34px,5vw,90px)]">
        <div>
          <span className="eyebrow text-accent">Contact</span>
          <h1 className="mt-5 font-display text-[clamp(38px,6vw,92px)] leading-none tracking-[-0.02em]">
            Say hello
          </h1>
          <p className="mt-7 max-w-[32em] text-[15px] font-light leading-[1.85] text-ink-soft">
            For available works, commissions, press or studio visits. Enquiries
            are answered personally, usually within two days.
          </p>

          <dl className="mt-12 grid gap-7">
            <div>
              <dt className="micro mb-2 text-muted">Studio</dt>
              <dd className="m-0 text-[15px] leading-[1.7]">
                {site.studios.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="micro mb-2 text-muted">Email</dt>
              <dd className="m-0">
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-[15px]"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="micro mb-2 text-muted">Follow</dt>
              <dd className="m-0 flex flex-wrap gap-[18px] text-[14px]">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="link-underline">
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <Suspense
          fallback={
            <div className="border border-line p-[clamp(24px,3.4vw,44px)] text-[13px] text-muted">
              Loading the form…
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
