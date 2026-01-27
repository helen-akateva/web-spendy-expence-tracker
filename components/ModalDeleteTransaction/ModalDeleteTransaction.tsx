import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFinanceStore } from "@/lib/stores/financeStore";
import CancelButton from "../CancelButton/CancelButton";
import Modal from "../Modal/Modal";
import css from "./ModalDeleteTransaction.module.css";
import { deleteTransaction, Transaction } from "@/lib/api/transactions";
import toast from "react-hot-toast";

interface Props {
  transaction: {
    _id: string;
    type: "income" | "expense";
    amount: number;
    date: string;
    category: { _id: string; name: string };
    comment?: string;
  };
  onClose: () => void;
}

export default function ModalDeleteTransaction({
  transaction,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const updateBalance = useFinanceStore((s) => s.updateBalance);

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      const isIncome = transaction.type === "income";
      updateBalance(transaction.amount, !isIncome);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
        old.filter((t) => t._id !== transaction._id),
      );
      toast.success("Transaction deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  const handleDelete = () => {
    mutation.mutate(transaction._id);
  };

  return (
    <Modal onClose={onClose} showCloseButton>
      <div className={css.content}>
        <svg width="54" height="54" className={css.logo}>
          <use href="/sprite.svg#icon-logo" />
        </svg>

        <h2 className={css.title}>Spendy</h2>

        <p className={css.p}>
          Are you sure you want to delete this transaction?
        </p>

        <button
          type="button"
          className={css.delete}
          onClick={handleDelete}
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Deleting..." : "Delete"}
        </button>

        <CancelButton onClick={onClose} />
      </div>
    </Modal>
  );
}
