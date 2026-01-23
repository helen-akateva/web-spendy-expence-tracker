import { nextApi } from "./api";

export interface SummaryCategory {
  category: string;
  type: "income" | "expense";
  total: number;
}

export interface MonthlySummaryResponse {
  period: string;
  categories: SummaryCategory[];
  totals: {
    totalIncome: number;
    totalExpense: number;
  };
}

export async function getMonthlySummary(
  period: string,
): Promise<MonthlySummaryResponse> {
  const res = await nextApi.get<MonthlySummaryResponse>(
    `/api/summary/${period}`,
  );
  return res.data;
}

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await nextApi.get<CurrentUser>("/api/users/current");
  return res.data;
}
