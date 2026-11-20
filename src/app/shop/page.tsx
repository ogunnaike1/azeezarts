import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShopBrowser } from "@/components/ShopBrowser";
import { CommissionCta } from "@/components/CommissionCta";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Original paintings available direct from the studio. One-of-one works, crated and insured worldwide, with a certificate of authenticity.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Originals · direct from the studio"
        title="Shop"
        intro="Every painting listed here is a one-of-one original, photographed in daylight and shipped crated and insured. Add paintings to your bag and finish the order in a WhatsApp chat with the studio."
      />
      <ShopBrowser />
      <CommissionCta />
    </>
  );
}
