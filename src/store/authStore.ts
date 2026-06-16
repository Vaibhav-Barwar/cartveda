import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => Promise<User>;
  signup: (name: string, email: string, _password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

const makeId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto)
  ? crypto.randomUUID()
  : `u_${Math.random().toString(36).slice(2)}`;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // Local-only authentication — swap with a real backend later.
      login: async (email) => {
        const user: User = {
          id: makeId(),
          name: email.split("@")[0] || "Member",
          email,
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return user;
      },

      signup: async (name, email) => {
        const user: User = {
          id: makeId(),
          name,
          email,
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return user;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (patch) => {
        const u = get().user;
        if (!u) return;
        set({ user: { ...u, ...patch } });
      },
    }),
    {
      name: "cartveda.auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
