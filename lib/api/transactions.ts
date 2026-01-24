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
