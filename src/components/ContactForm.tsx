"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEnquiry } from "@/lib/useEnquiry";
import { getArtwork } from "@/lib/artworks";

const SUBJECTS = [
  "Purchase an available work",
  "Commission enquiry",
  "Studio visit",
  "Press & exhibitions",
];

export function ContactForm() {
  const params = useSearchParams();
  const { state, reference, error, submit } = useEnquiry("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });

  // Arriving from a work's "Inquire" button pre-fills the message.
  const workSlug = params.get("work");
  useEffect(() => {
    if (!workSlug) return;
    const artwork = getArtwork(workSlug);
    if (!artwork) return;
    setForm((f) =>
      f.message
        ? f
        : {
            ...f,
            subject: SUBJECTS[0],
            message: `I'd like to know more about "${artwork.title}" (${artwork.year}, ${artwork.dims}).`,
          },
    );
  }, [workSlug]);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (state === "sent") {
    return (
      <div className="border border-line p-[clamp(24px,3.4vw,44px)]">
        <span className="eyebrow text-accent">Message sent</span>
        <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,34px)] leading-tight">
          Thank you — reference {reference}.
        </h2>
        <p className="mt-5 text-[14.5px] font-light leading-[1.85] text-ink-soft">
          Enquiries are answered personally, usually within two working days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="border border-line p-[clamp(24px,3.4vw,44px)]"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(form);
      }}
    >
      <div className="grid gap-[22px]">
        <label className="flex flex-col gap-2">
          <span className="micro text-muted">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro text-muted">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@email.com"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro text-muted">Subject</span>
          <select
            value={form.subject}
            onChange={(e) => set("subject")(e.target.value)}
            className="field"
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro text-muted">Message</span>
          <textarea
            rows={5}
            required
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Tell me a little about what you're looking for."
            className="field-box"
          />
        </label>
      </div>

      {error && <p className="mt-4 text-[12.5px] text-accent">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-primary mt-7 w-full"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>

      <p className="mt-4 text-[12px] font-light leading-[1.7] text-muted">
        Prefer email? Write to studio@miraadeyemi.com directly.
      </p>
    </form>
  );
}
