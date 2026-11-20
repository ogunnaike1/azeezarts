"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const TYPES = [
  "Portrait",
  "Gele portrait",
  "Family / couple portrait",
  "Landscape",
  "Interior / scene",
];
const SIZES = [
  "Intimate — 24 × 30 in",
  "Standard — 36 × 48 in",
  "Statement — 48 × 60 in",
  "Architectural — bespoke",
];
const BUDGETS = [
  "$2,800 — $5,000",
  "$5,000 — $9,000",
  "$9,000 — $15,000",
  "$15,000 +",
];

const FIELD_LABEL = "micro text-muted";

export function CommissionForm() {
  const [form, setForm] = useState({
    name: "",
    type: TYPES[0],
    size: SIZES[1],
    budget: BUDGETS[0],
    timeline: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      className="border border-line bg-canvas p-[clamp(24px,3.4vw,44px)]"
      onSubmit={(e) => {
        e.preventDefault();
        const message = [
          `Hello Azeezarts, I would like to request a commission.`,
          ``,
          `Name: ${form.name}`,
          `Type: ${form.type}`,
          `Size: ${form.size}`,
          `Budget: ${form.budget}`,
          ...(form.timeline ? [`Timeline: ${form.timeline}`] : []),
          ...(form.message ? [``, `What I have in mind: ${form.message}`] : []),
          ``,
          `I will send my reference photo(s) in this chat.`,
        ].join("\n");
        window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <h3 className="m-0 font-display text-[clamp(22px,2.4vw,30px)]">
        Request a commission
      </h3>

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[18px]">
        <label className="flex flex-col gap-2">
          <span className={FIELD_LABEL}>Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={FIELD_LABEL}>Artwork type</span>
          <select
            value={form.type}
            onChange={(e) => set("type")(e.target.value)}
            className="field"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={FIELD_LABEL}>Preferred size</span>
          <select
            value={form.size}
            onChange={(e) => set("size")(e.target.value)}
            className="field"
          >
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={FIELD_LABEL}>Budget range</span>
          <select
            value={form.budget}
            onChange={(e) => set("budget")(e.target.value)}
            className="field"
          >
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={FIELD_LABEL}>Timeline</span>
          <input
            value={form.timeline}
            onChange={(e) => set("timeline")(e.target.value)}
            placeholder="e.g. before December"
            className="field"
          />
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className={FIELD_LABEL}>The painting you imagine</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="The room, the light, the feeling you want to live with."
          className="field-box"
        />
      </label>

      <p className="mt-6 border border-dashed border-line-soft p-6 text-[13px] font-light leading-[1.7] text-muted">
        <span className="eyebrow block text-accent">Reference image</span>
        <span className="mt-2 block">
          Have a photo of the person, the wall or a palette you love? Send it
          in the WhatsApp chat once it opens — a clear, well-lit photo works
          best.
        </span>
      </p>

      <button type="submit" className="btn btn-primary mt-7 w-full">
        Send request on WhatsApp
      </button>
    </form>
  );
}
