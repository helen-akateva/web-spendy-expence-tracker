import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";

import css from "./ModalEditTransaction.module.css";
import CancelButton from "../CancelButton/CancelButton";

interface Props {
  transaction: {
    id: string;
    type: "income" | "expense";
    amount: number;
    date: string;
    categoryId: string;
    comment: string;
  };
  onClose: () => void;
}

export default function ModalEditTransaction({ transaction, onClose }: Props) {
  const initialValues: TransactionFormValues = {
    type: transaction.type,
    amount: transaction.amount,
    date: new Date(transaction.date),
    categoryId: transaction.categoryId,
    comment: transaction.comment,
  };

  const handleSubmit = async (values: TransactionFormValues) => {
    // await api.updateTransaction(transaction.id, values);
    console.log("EDIT:", values);

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
