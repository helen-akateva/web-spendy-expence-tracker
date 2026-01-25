import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";

import css from "./ModalEditTransaction.module.css";
import CancelButton from "../CancelButton/CancelButton";

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

export default function ModalEditTransaction({ transaction, onClose }: Props) {
  const initialValues: TransactionFormValues = {
    type: transaction.type,
    amount: transaction.amount,
    date: new Date(transaction.date),
    categoryId: transaction.category._id,
    comment: transaction.comment ?? "",
  };

  const handleSubmit = async (values: TransactionFormValues) => {
    console.log("EDIT:", {
      id: transaction._id,
      ...values,
    });

    onClose();
  };

  return (
    <Modal onClose={onClose} showCloseButton>
      <h2 className={css.h2}>Edit transaction</h2>

      <TransactionForm
        initialValues={initialValues}
        submitText="Save"
        onSubmit={handleSubmit}
      />

      <CancelButton onClick={onClose} />
    </Modal>
  );
}
