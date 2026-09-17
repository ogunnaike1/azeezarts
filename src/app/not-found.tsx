import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center pb-[clamp(60px,8vw,110px)] pt-[clamp(130px,15vw,220px)]">
      <span className="eyebrow text-accent">404</span>
      <h1 className="mt-5 max-w-[14em] font-display text-[clamp(34px,6vw,80px)] leading-[1.02] tracking-[-0.02em]">
        This one has left the studio.
      </h1>
      <p className="mt-6 max-w-[32em] text-[15px] font-light leading-[1.85] text-ink-soft">
        The page you were looking for isn’t here. The catalogue is, though —
        along with everything currently available.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/works"
          className="btn btn-outline"
        >
          View the catalogue
        </Link>
        <Link
          href="/"
          className="btn btn-quiet"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
