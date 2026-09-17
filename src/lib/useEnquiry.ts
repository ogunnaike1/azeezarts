"use client";

import { useCallback, useState } from "react";

export type EnquiryState = "idle" | "sending" | "sent" | "error";

type SubmitResult = { ok: boolean; reference?: string; error?: string };

/**
 * Posts any of the site's forms to /api/enquiry and tracks the button state.
 */
export function useEnquiry(kind: "contact" | "commission" | "newsletter" | "order") {
  const [state, setState] = useState<EnquiryState>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setState("sending");
      setError(null);
      try {
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, ...payload }),
        });
        const result: SubmitResult = await response.json();
        if (!response.ok || !result.ok) {
          setError(result.error ?? "Something went wrong. Please try again.");
          setState("error");
          return false;
        }
        setReference(result.reference ?? null);
        setState("sent");
        return true;
      } catch {
        setError("Could not reach the studio. Please email instead.");
        setState("error");
        return false;
      }
    },
    [kind],
  );

  const reset = useCallback(() => {
    setState("idle");
    setError(null);
  }, []);

  return { state, reference, error, submit, reset };
}
