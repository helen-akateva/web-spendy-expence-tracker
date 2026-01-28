// src/stores/financeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CurrencyRate {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateCross?: number;
  rateSell: number;
}

interface FinanceState {
  balance: number;
  currency: {
    rates: CurrencyRate[];
    lastFetched: number;
  };
  setBalance: (value: number) => void;
  updateBalance: (amount: number, isIncome: boolean) => void;
  setCurrency: (data: { rates: CurrencyRate[]; lastFetched: number }) => void;
  setUserData: (user: { balance: number }) => void;
  isLoadingCurrency: boolean;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      balance: 0,
      currency: { rates: [], lastFetched: 0 },
      isLoadingCurrency: false,

      setBalance: (value) => set({ balance: value }),

      setUserData: (user) => set({ balance: user.balance }),

      updateBalance: (amount, isIncome) => {
        const current = get().balance;
        set({
          balance: isIncome ? current + amount : current - Math.abs(amount),
        });
      },

      setCurrency: (data) => set({ currency: data }),
    }),

    {
      name: "spendy-finance",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        balance: state.balance,
        currency: state.currency,
      }),
    },
  ),
);
