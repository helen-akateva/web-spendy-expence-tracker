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
  token: string | null;
  setAuth: (user: UserData, token: string) => void;
  setUser: (user: UserData) => void;
  updateBalance: (balance: number) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      // Встановити користувача та токен при логіні/реєстрації
      setAuth: (user: UserData, token: string) => {
        set(() => ({
          user,
          token,
          isAuthenticated: true,
        }));
      },

      // Оновити дані користувача
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
          token: null,
          isAuthenticated: false,
        }));
        // Очищаємо localStorage
        localStorage.removeItem("auth-storage");
      },

      // Альтернативний метод очищення (deprecated)
      clearAuth: () => {
        set(() => ({
          user: null,
          token: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
