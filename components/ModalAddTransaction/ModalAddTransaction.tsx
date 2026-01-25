import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";
import css from "./ModalAddTransaction.module.css";
import CancelButton from "../CancelButton/CancelButton";
import { addNewTransaction } from "@/lib/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export default function ModalAddTransaction({ onClose }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addNewTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction added successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  const initialValues: TransactionFormValues = {
    type: "expense",
    amount: 0,
    date: new Date(),
    categoryId: "",
    comment: "",
  };

  const handleSubmit = async (values: TransactionFormValues) => {
    const payload = {
      ...values,
      date: values.date.toISOString().split("T")[0],
    };

    mutation.mutate(payload);
  };

  return (
    <Modal className={css.modal} onClose={onClose} showCloseButton>
      <h2 className={css.h2}>Add transaction</h2>
      <TransactionForm
        initialValues={initialValues}
        submitText="Add"
        onSubmit={handleSubmit}
      />

      <CancelButton onClick={onClose} />
    </Modal>
  );
}
