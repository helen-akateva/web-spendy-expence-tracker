// src/stores/financeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CurrencyRate {
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
}

export const useFinanceStore = create<FinanceState>()(
	persist(
		(set, get) => ({
			balance: 0,
			currency: { rates: [], lastFetched: 0 },

			setBalance: (value) => set({ balance: value }),

			updateBalance: (amount, isIncome) => {
				const current = get().balance;
				set({
					balance:
						isIncome ? current + amount : current - Math.abs(amount),
				});
			},

			setCurrency: (data) => set({ currency: data }),
		}),

		{
			name: "spendy-finance", // ключ в localStorage
			storage: createJSONStorage(() => localStorage), // ← вот это важно
			partialize: (state) => ({
				// что именно сохранять
				balance: state.balance,
				currency: state.currency,
			}),
			// version: 1,                              // можно добавить, если планируешь миграции
		}
	)
);
