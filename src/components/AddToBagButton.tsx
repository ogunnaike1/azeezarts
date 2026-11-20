"use client";

import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/site";
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
          window.open(
            whatsappLink(
              `Hello Azeezarts, I saw "${artwork.title}" on your website${
                artwork.status === "Sold" ? " (sold)" : " (reserved)"
              }. ${
                artwork.status === "Sold"
                  ? "Could you paint something similar for me?"
                  : "Please add me to the waitlist."
              }`,
            ),
            "_blank",
            "noopener,noreferrer",
          );
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
