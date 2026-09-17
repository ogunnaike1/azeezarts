import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorksBrowser } from "@/components/WorksBrowser";
import { artworks } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Works",
  description:
    "The full catalogue of paintings by Azeez — interiors, thresholds, landscapes and studies in oil, pigment and cold wax.",
};

export default function WorksPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Catalogue · ${artworks.length} works`}
        title="Works"
      />
      <WorksBrowser />
    </>
  );
}
