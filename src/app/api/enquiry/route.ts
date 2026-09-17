import { NextResponse } from "next/server";

type EnquiryKind = "contact" | "commission" | "newsletter" | "order";

type Enquiry = {
  kind: EnquiryKind;
  email: string;
  name?: string;
  message?: string;
  [key: string]: unknown;
};

const KINDS: EnquiryKind[] = ["contact", "commission", "newsletter", "order"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function reference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const noise = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `MA-${stamp}${noise}`;
}

/**
 * Single intake endpoint for every form on the site.
 *
 * It currently validates and logs. To make enquiries actually arrive, send the
 * payload on from here — Resend, Postmark, SendGrid or a Google Sheet all drop
 * in at the marked line without touching the client components.
 */
export async function POST(request: Request) {
  let body: Enquiry;

  try {
    body = (await request.json()) as Enquiry;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  if (!KINDS.includes(body?.kind)) {
    return NextResponse.json(
      { ok: false, error: "Unknown enquiry type." },
      { status: 400 },
    );
  }

  if (typeof body.email !== "string" || !EMAIL.test(body.email.trim())) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 422 },
    );
  }

  if (body.kind !== "newsletter" && !String(body.name ?? "").trim()) {
    return NextResponse.json(
      { ok: false, error: "Please include your name." },
      { status: 422 },
    );
  }

  const ref = reference();

  // ── Deliver the enquiry here ──────────────────────────────────────────────
  // e.g. await resend.emails.send({ to: site.email, subject: ..., text: ... })
  console.info(`[enquiry:${body.kind}] ${ref}`, body);

  return NextResponse.json({ ok: true, reference: ref });
}
