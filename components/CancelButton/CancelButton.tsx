"use client";

import css from "./CancelButtin.module.css";

interface CancelButtonProps {
  onClick: () => void;
  text?: string;
}

export default function CancelButton({
  onClick,
  text = "Cancel",
}: CancelButtonProps) {
  return (
    <div className={css.actions}>
      <button type="button" className={css.button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
