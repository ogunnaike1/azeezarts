"use client";

import { useState } from "react";
import { useEnquiry } from "@/lib/useEnquiry";

const TYPES = ["Abstract", "Interior", "Landscape", "Portrait"];
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
  const { state, reference, error, submit } = useEnquiry("commission");
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: TYPES[0],
    size: SIZES[1],
    budget: BUDGETS[0],
    timeline: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (state === "sent") {
    return (
      <div className="border border-line bg-canvas p-[clamp(24px,3.4vw,44px)]">
        <span className="eyebrow text-accent">Request received</span>
        <h3 className="mt-4 font-display text-[clamp(24px,2.8vw,34px)] leading-tight">
          Thank you — reference {reference}.
        </h3>
        <p className="mt-5 text-[14.5px] font-light leading-[1.85] text-ink-soft">
          Azeez reads every commission request personally. You’ll hear back within two
          working days to arrange the first conversation — there’s no fee and no
          obligation at that stage.
        </p>
      </div>
    );
  }

  return (
    <form
      className="border border-line bg-canvas p-[clamp(24px,3.4vw,44px)]"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(form);
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
          <span className={FIELD_LABEL}>Email</span>
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
          Have a photo of the wall or a palette you love? Reply to the
          confirmation email and attach it — JPG or PNG, up to 10MB.
        </span>
      </p>

      {error && <p className="mt-4 text-[12.5px] text-accent">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-primary mt-7 w-full"
      >
        {state === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
