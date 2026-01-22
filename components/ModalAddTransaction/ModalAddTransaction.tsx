import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";
import css from "./ModalAddTransaction.module.css";

interface Props {
  onClose: () => void;
}

export default function ModalAddTransaction({ onClose }: Props) {
  const initialValues: TransactionFormValues = {
    type: "expense",
    amount: "",
    date: new Date(),
    category: "",
    comment: "",
  };

  const handleSubmit = async (values: TransactionFormValues) => {
    // await api.createTransaction(values);
    console.log("ADD:", values);

    onClose();
  };

  return (
    <Modal className={css.modal} onClose={onClose} showCloseButton>
      <h2 className={css.h2}>Add transaction</h2>
      <TransactionForm
        initialValues={initialValues}
        submitText="Add"
        onSubmit={handleSubmit}
      />

      <div className={css.actions}>
        <button className={css.buttonCancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
