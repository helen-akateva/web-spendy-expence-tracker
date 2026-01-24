import CancelButton from "../CancelButton/CancelButton";
import Modal from "../Modal/Modal";
import css from "./ModalDeleteTransaction.module.css";

interface Props {
  onClose: () => void;
}

export default function ModalDeleteTransaction({ onClose }: Props) {
  return (
    <Modal onClose={onClose} showCloseButton>
      <div className={css.content}>
        <svg width="54" height="54" className={css.logo}>
          <use href="/sprite.svg#icon-logo" />
        </svg>
        <h2 className={css.title}>Spendy</h2>
        <p className={css.p}>Are you sure you want to Delete?</p>
        <button type="button" className={css.delete}>
          Delete
        </button>
        <CancelButton onClick={onClose} />
      </div>
    </Modal>
  );
}
