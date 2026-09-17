"use client";

import { useState } from "react";
import { useEnquiry } from "@/lib/useEnquiry";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { state, error, submit } = useEnquiry("newsletter");

  if (state === "sent") {
    return (
      <p className="mt-8 max-w-[30em] border-t border-linen/14 pt-6 text-[13.5px] leading-[1.8] text-khaki">
        You’re on the list. New work and studio notes, roughly once a month.
      </p>
    );
  }

  return (
    <form
      className="mt-8 max-w-[30em] border-t border-linen/14 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        void submit({ email });
      }}
    >
      <label htmlFor="newsletter-email" className="eyebrow text-khaki">
        Studio letter
      </label>
      <div className="mt-3 flex items-end gap-3">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 border-0 border-b border-camel bg-transparent py-2.5 text-[14px] text-linen outline-none transition-colors duration-400 placeholder:text-khaki/70 focus:border-khaki"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="cursor-pointer border-b border-khaki pb-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-khaki transition-opacity duration-400 hover:opacity-70 disabled:cursor-wait disabled:opacity-50"
        >
          {state === "sending" ? "Sending" : "Join"}
        </button>
      </div>
      {error && <p className="mt-3 text-[12px] text-khaki">{error}</p>}
    </form>
  );
}
