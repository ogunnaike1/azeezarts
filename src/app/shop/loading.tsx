import { PageHeader } from "@/components/PageHeader";
import { GallerySkeleton } from "@/components/GallerySkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader
        eyebrow="Originals · direct from the studio"
        title="Shop"
        intro="Every painting listed here is a one-of-one original, photographed in daylight and shipped crated and insured."
      />
      <GallerySkeleton count={6} />
    </>
  );
}
