import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { effectivePrice } from "@/utils/format";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, opts?: { quantity?: number; color?: string }) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),

      addItem: (product, opts) => {
        const quantity = opts?.quantity ?? 1;
        const items = [...get().items];
        const idx = items.findIndex((i) => i.productId === product.id && i.color === opts?.color);
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        } else {
          items.push({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            price: effectivePrice(product),
            currency: product.currency,
            quantity,
            color: opts?.color,
          });
        }
        set({ items });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        });
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    {
      name: "cartveda.cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }) as any,
    },
  ),
);
