import { PageHeader } from "@/components/PageHeader";
import { GallerySkeleton } from "@/components/GallerySkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Works" />
      <GallerySkeleton count={9} />
    </>
  );
}
