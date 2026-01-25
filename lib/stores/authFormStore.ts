import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthFormState = {
  email: string;
  name: string;

  setEmail: (email: string) => void;
  setName: (name: string) => void;
  clear: () => void;
};

export const useAuthFormStore = create<AuthFormState>()(
  persist(
    (set) => ({
      email: "",
      name: "",

      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),

      clear: () => set({ email: "", name: "" }),
    }),
    { name: "auth-form-storage" },
  ),
);
