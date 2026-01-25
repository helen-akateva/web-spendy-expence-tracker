import CancelButton from "../CancelButton/CancelButton";
import Modal from "../Modal/Modal";
import css from "./ModalDeleteTransaction.module.css";

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
  const handleDelete = () => {
    console.log("DELETE:", transaction._id);
    onClose();
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
