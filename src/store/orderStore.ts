import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/types";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  clear: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      clear: () => set({ orders: [] }),
    }),
    {
      name: "cartveda.orders",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
