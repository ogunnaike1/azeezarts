import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CommissionForm } from "@/components/CommissionForm";
import { commissionSizes, commissionSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission an original painting from Azeez. Four stages from conversation to crate, with sizes, timelines and starting prices.",
};

export default function CommissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commissions · 3 slots open for 2026"
        title={
          <>
            A painting
            <br />
            made for
            <br />
            your room
          </>
        }
        intro="Commissions begin with a conversation about the space, the light and what you want the painting to hold. Nothing is rushed; nothing is delivered until you have seen it."
      />

      <section className="shell py-[clamp(60px,8vw,120px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(24px,3vw,50px)] border-t border-line pt-9">
          {commissionSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <span className="font-mono text-[10.5px] tracking-[0.2em] text-accent">
                {step.num}
              </span>
              <h3 className="mt-4 font-display text-[clamp(20px,2vw,27px)] leading-tight">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14px] font-light leading-[1.8] text-ink-soft">
                {step.body}
              </p>
              <p className="mt-3.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                {step.time}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band py-[clamp(60px,8vw,120px)]">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(34px,5vw,84px)]">
          <div>
            <h2 className="m-0 font-display text-[clamp(26px,3.2vw,42px)] tracking-[-0.01em]">
              Sizes &amp; investment
            </h2>
            <dl className="mt-8 m-0">
              {commissionSizes.map((size) => (
                <div
                  key={size.name}
                  className="flex items-baseline justify-between gap-5 border-b border-line-soft py-[18px]"
                >
                  <div>
                    <dt className="text-[15px]">{size.name}</dt>
                    <dd className="mt-1.5 m-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {size.dims}
                    </dd>
                  </div>
                  <span className="font-mono text-[13px] whitespace-nowrap">
                    {size.price}
                  </span>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[12.5px] font-light leading-[1.8] text-muted">
              Figures are a starting point and include a 30% studio deposit,
              crated shipping and a certificate of authenticity.
            </p>
          </div>

          <CommissionForm />
        </div>
      </section>
    </>
  );
}
