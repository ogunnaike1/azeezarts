import Link from "next/link";
import { nav, site, socials } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-[clamp(40px,6vw,90px)] bg-espresso text-linen">
      <div className="shell grid gap-[clamp(34px,5vw,72px)] py-[clamp(56px,7vw,104px)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Azeezarts — home">
            <Logo size={40} />
          </Link>
          <p className="mt-6 max-w-[30em] text-[14px] font-light leading-[1.85] text-linen/72">
            Original paintings, commissions and studio news. Every work ships
            crated and insured with a certificate of authenticity.
          </p>
          <NewsletterForm />
        </div>

        <nav className="flex flex-col gap-3">
          <span className="eyebrow text-khaki">Pages</span>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-fit text-[14px] text-linen/82 transition-colors duration-500 hover:text-khaki"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="eyebrow text-khaki">Studio</span>
          {site.studios.map((line) => (
            <span key={line} className="text-[14px] leading-[1.7] text-linen/82">
              {line}
            </span>
          ))}
          <a href={`mailto:${site.email}`} className="w-fit border-b border-camel pb-0.5 text-[14px] text-linen/82 transition-colors duration-500 hover:border-khaki hover:text-khaki">
            {site.email}
          </a>
          <div className="mt-3 flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-khaki transition-colors duration-500 hover:text-khaki"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-linen/14 py-6 font-mono text-[9.5px] uppercase tracking-[0.24em] text-khaki">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>All works © the artist</span>
      </div>
    </footer>
  );
}
