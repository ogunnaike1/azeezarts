export function PageHeader({
  eyebrow,
  title,
  intro,
  size = "large",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  size?: "large" | "medium";
}) {
  return (
    <header className="shell pt-[clamp(130px,15vw,220px)]">
      <span className="eyebrow text-accent">{eyebrow}</span>
      <h1
        className={`mt-5 font-display tracking-[-0.02em] ${
          size === "large"
            ? "text-[clamp(44px,8vw,120px)] leading-[0.96]"
            : "max-w-[17em] text-[clamp(34px,5.6vw,86px)] leading-[1.04]"
        }`}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-7 max-w-[40em] text-[15px] font-light leading-[1.85] text-ink-soft">
          {intro}
        </p>
      )}
    </header>
  );
}
