"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { isPurchasable, type Artwork } from "@/lib/artworks";

type Props = {
  artwork: Artwork;
  variant?: "solid" | "outline";
  className?: string;
};

export function AddToBagButton({
  artwork,
  variant = "solid",
  className = "",
}: Props) {
  const router = useRouter();
  const { add, has, open } = useCart();
  const inBag = has(artwork.slug);
  const purchasable = isPurchasable(artwork);

  const label = !purchasable
    ? artwork.status === "Sold"
      ? "Sold — enquire about similar"
      : "Reserved — join the waitlist"
    : inBag
      ? "In your bag — view"
      : "Add to bag";

  const tone = !purchasable
    ? "btn-quiet"
    : variant === "solid"
      ? "btn-primary"
      : "btn-outline";

  return (
    <button
      type="button"
      className={`btn w-full ${tone} ${className}`}
      onClick={() => {
        if (!purchasable) {
          router.push(`/contact?work=${artwork.slug}`);
          return;
        }
        if (inBag) open();
        else add(artwork);
      }}
    >
      {label}
    </button>
  );
}
