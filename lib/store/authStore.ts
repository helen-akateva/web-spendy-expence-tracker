import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserData {
  id: string;
  email: string;
  name?: string;
  balance?: number;
  createdAt?: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: UserData | null;
  setUser: (user: UserData) => void;
  updateBalance: (balance: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // Встановити дані користувача при логіні/реєстрації
      setUser: (user: UserData) => {
        set(() => ({
          user,
          isAuthenticated: true,
        }));
      },

      // Оновити баланс користувача
      updateBalance: (balance: number) => {
        set((state) => ({
          user: state.user ? { ...state.user, balance } : null,
        }));
      },

      // Повне очищення при logout
      logout: () => {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
        // Очищаємо localStorage
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);
