"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/artworks";
import { useEnquiry } from "@/lib/useEnquiry";

export function CartDrawer() {
  const { items, total, isOpen, close, remove, clear } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const { state, reference, error, submit, reset } = useEnquiry("order");

  const closeDrawer = () => {
    close();
    // Let the exit animation finish before resetting the panel.
    window.setTimeout(() => {
      setCheckingOut(false);
      reset();
    }, 400);
  };

  const placeOrder = async () => {
    const ok = await submit({
      name,
      email,
      works: items.map((i) => `${i.title} — ${formatPrice(i.price)}`),
      total,
    });
    if (ok) clear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[130] bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-label="Your bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[131] flex w-full max-w-[460px] flex-col bg-canvas"
          >
            <header className="flex items-center justify-between border-b border-line px-[clamp(20px,4vw,34px)] py-6">
              <div>
                <span className="eyebrow text-accent">Your bag</span>
                <p className="mt-2 font-display text-[24px]">
                  {items.length} {items.length === 1 ? "work" : "works"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="cursor-pointer font-mono text-[13px] transition-colors duration-400 hover:text-accent"
              >
                Close ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-[clamp(20px,4vw,34px)]">
              {state === "sent" ? (
                <div className="flex h-full flex-col justify-center py-14">
                  <span className="eyebrow text-accent">Enquiry received</span>
                  <h3 className="mt-4 font-display text-[clamp(26px,3.4vw,36px)] leading-tight">
                    Thank you — your reference is {reference}.
                  </h3>
                  <p className="mt-5 text-[14px] font-light leading-[1.85] text-ink-soft">
                    Azeez replies to purchase enquiries personally, usually within
                    two working days, with an invoice and crating timeline for
                    your address.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col justify-center py-14">
                  <p className="font-display text-[clamp(24px,3vw,32px)] leading-tight">
                    Your bag is empty.
                  </p>
                  <p className="mt-4 text-[14px] font-light leading-[1.85] text-ink-soft">
                    Every painting is a one-of-one original, so each can be added
                    only once.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="btn btn-outline mt-8 w-fit"
                  >
                    Browse available works
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-4 py-6">
                      <div
                        className="painting relative h-[86px] w-[68px] shrink-0 overflow-hidden border border-line"
                        style={{ backgroundColor: item.tone }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="68px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link
                          href={`/works/${item.slug}`}
                          onClick={closeDrawer}
                          className="font-display text-[19px] leading-tight transition-colors duration-400 hover:text-accent"
                        >
                          {item.title}
                        </Link>
                        <span className="mt-1 text-[11.5px] font-light tracking-[0.05em] text-muted">
                          {item.meta}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(item.slug)}
                          className="mt-auto w-fit cursor-pointer font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted transition-colors duration-400 hover:text-accent"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="font-mono text-[12.5px] whitespace-nowrap">
                        {formatPrice(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && state !== "sent" && (
              <footer className="border-t border-line px-[clamp(20px,4vw,34px)] py-6">
                <div className="flex items-baseline justify-between">
                  <span className="micro text-muted">Total</span>
                  <span className="font-mono text-[18px]">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] font-light leading-[1.7] text-muted">
                  Includes crated worldwide shipping and insurance.
                </p>

                {checkingOut ? (
                  <form
                    className="mt-5 grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void placeOrder();
                    }}
                  >
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="field"
                    />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="field"
                    />
                    {error && <p className="text-[12px] text-accent">{error}</p>}
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="btn btn-primary"
                    >
                      {state === "sending" ? "Sending…" : "Send purchase enquiry"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckingOut(false)}
                      className="cursor-pointer font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted hover:text-accent"
                    >
                      Back to bag
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCheckingOut(true)}
                    className="btn btn-primary mt-5 w-full"
                  >
                    Reserve these works
                  </button>
                )}
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
