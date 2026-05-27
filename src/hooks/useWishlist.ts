import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set({ ids: get().ids.includes(id) ? get().ids.filter((x) => x !== id) : [...get().ids, id] }),
      has: (id) => get().ids.includes(id),
    }),
    { name: "cartveda-wishlist", storage: createJSONStorage(() => localStorage) }
  )
);
