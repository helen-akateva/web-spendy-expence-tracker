import { nextApi } from "./api";

export interface Transaction {
  _id: string;
  userId: string;
  type: "income" | "expense";
  category: {
    _id: string;
    name: string;
    type: "income" | "expense";
  };
  amount: number;
  date: string;
  comment?: string;
}

export interface TransactionsListResponse {
  transactions: Transaction[];
}

export interface UpdateTransactionData {
  type: "income" | "expense";
  categoryId: string;
  amount: number;
  date: string; // YYYY-MM-DD
  comment?: string;
}

export type NewTransactionData = Pick<
  Transaction,
  "type" | "amount" | "date" | "comment"
> & { categoryId: string };

export const fetchAllTransactions = async () => {
  const response =
    await nextApi.get<TransactionsListResponse>("api/transactions");
  return response.data.transactions;
};

export const addNewTransaction = async (
  transactionData: NewTransactionData,
) => {
  const response = await nextApi.post<Transaction>(
    "api/transactions",
    transactionData,
  );
  return response.data;
};

export const updateTransaction = async (
  id: string,
  data: UpdateTransactionData,
) => {
  const response = await nextApi.patch<Transaction>(
    `/api/transactions/${id}`,
    data,
  );

  return response.data;
};

export const deleteTransaction = async (id: string) => {
  await nextApi.delete(`/api/transactions/${id}`);
};
