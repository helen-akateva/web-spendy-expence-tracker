import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFinanceStore } from "@/lib/stores/financeStore";
import CancelButton from "../CancelButton/CancelButton";
import Modal from "../Modal/Modal";
import css from "./ModalDeleteTransaction.module.css";
import { deleteTransaction } from "@/lib/api/transactions";
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
  const currentBalance = useFinanceStore((s) => s.balance);

  const { mutate } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      const isIncome = transaction.type === "income";
      updateBalance(transaction.amount, !isIncome);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast.success("Transaction deleted successfully");
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to delete transaction";
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    // Calculate what the balance would be after deletion
    const isIncome = transaction.type === "income";
    const newBalance = isIncome
      ? currentBalance - transaction.amount  // Removing income decreases balance
      : currentBalance + transaction.amount; // Removing expense increases balance

    // Prevent deletion if balance would become negative
    if (newBalance < 0) {
      toast.error(
        "Cannot delete this transaction. Balance would become negative. Please delete expenses first.",
        { duration: 4000 }
      );
      return;
    }

    mutate(transaction._id);
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

        <button type="button" className={css.delete} onClick={handleDelete}>
          Delete
        </button>

        <CancelButton onClick={onClose} />
      </div>
    </Modal>
  );
}
