"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { primaryImage, type Artwork } from "@/lib/artworks";

export type CartItem = {
  slug: string;
  title: string;
  price: number;
  meta: string;
  tone: string;
  ratio: string;
  /** Primary photograph, when the work has been photographed. */
  image?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  /** Paintings are one-of-one, so adding a work already in the bag is a no-op. */
  add: (artwork: Artwork) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "mira-adeyemi-bag";

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).slug === "string" &&
        typeof (item as CartItem).price === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount so the server render stays deterministic.
  useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the bag
      // simply stops persisting between visits.
    }
  }, [items, hydrated]);

  // Lock scroll while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const add = useCallback((artwork: Artwork) => {
    if (artwork.price === null) return;
    const price = artwork.price;
    setItems((current) => {
      if (current.some((item) => item.slug === artwork.slug)) return current;
      return [
        ...current,
        {
          slug: artwork.slug,
          title: artwork.title,
          price,
          meta: `${artwork.year} · ${artwork.dims}`,
          tone: artwork.tone,
          image: primaryImage(artwork)?.url,
          ratio: artwork.ratio,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.length,
      total: items.reduce((sum, item) => sum + item.price, 0),
      isOpen,
      add,
      remove,
      clear,
      has: (slug: string) => items.some((item) => item.slug === slug),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [items, isOpen, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
