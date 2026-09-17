"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, socials } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { useCart } from "@/context/CartContext";

/**
 * The nav inverts to cream while it sits over the home page's dark hero, then
 * settles onto the page ground once scrolled past it.
 */
export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only the home page has a full-bleed dark hero for the nav to sit over.
  const overHero = pathname === "/" && !scrolled;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-accent"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-[14px] transition-[background-color,border-color,color] duration-700 ${
          overHero
            ? "border-canvas/15 bg-transparent text-canvas"
            : "border-line bg-canvas/92 text-ink"
        }`}
      >
        <div
          className={`shell flex items-center justify-between transition-[height] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
            scrolled ? "h-[72px]" : "h-[104px]"
          }`}
        >
          <Link href="/" aria-label="Azeezarts — home">
            <Logo size={scrolled ? 30 : 38} />
          </Link>

          <nav className="hidden items-center gap-[clamp(18px,2.6vw,40px)] lg:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-[6px] text-[11.5px] uppercase tracking-[0.26em] transition-colors duration-500 ${
                    active && !overHero ? "text-accent" : ""
                  } ${overHero ? "hover:text-canvas" : "hover:text-accent"}`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-px origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                      overHero ? "bg-canvas" : "bg-accent"
                    } ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={open}
              aria-label={`Open bag, ${count} ${count === 1 ? "work" : "works"}`}
              className={`flex cursor-pointer items-baseline gap-2 transition-colors duration-500 ${
                overHero ? "hover:text-canvas" : "hover:text-accent"
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.26em]">Bag</span>
              <span className="min-w-[26px] border border-current py-[2px] text-center font-mono text-[11px] opacity-80">
                {count}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex cursor-pointer flex-col gap-[5px] py-2 lg:hidden"
            >
              <span
                className={`block h-px w-[22px] transition-transform duration-500 ${
                  overHero ? "bg-canvas" : "bg-ink"
                } ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-[22px] transition-transform duration-500 ${
                  overHero ? "bg-canvas" : "bg-ink"
                } ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-khaki px-7 lg:hidden"
          >
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.06 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between border-b border-line py-[10px] font-display text-[clamp(30px,9vw,48px)]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[11px] text-muted">
                    {item.num}
                  </span>
                </Link>
              </motion.div>
            ))}
            <div className="mt-9 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {socials.map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
