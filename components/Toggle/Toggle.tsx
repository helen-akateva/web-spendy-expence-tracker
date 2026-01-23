"use client";

import css from "./Toggle.module.css";

interface ToggleProps {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {
  const isExpense = value === "expense";

  return (
    <div className={css.toggleWrapper}>
      <label className={css.toggle}>
        <span className={`${css.label} ${!isExpense ? css.active : ""}`}>
          Income
        </span>

        <input
          type="checkbox"
          checked={isExpense}
          onChange={() => onChange(isExpense ? "income" : "expense")}
          className={css.hiddenInput}
        />

        <span className={css.track}>
          <span
            className={`${css.thumb} ${isExpense ? css.expense : css.income}`}
          >
            <svg
              className={`${css.iconThumb} ${css.minus}`}
              width="20"
              height="20"
            >
              <use href="/sprite.svg#icon-minus" />
            </svg>

            <svg
              className={`${css.iconThumb} ${css.plus}`}
              width="20"
              height="20"
            >
              <use href="/sprite.svg#icon-plus" />
            </svg>
          </span>
        </span>

        <span className={`${css.label} ${isExpense ? css.active : ""}`}>
          Expense
        </span>
      </label>
    </div>
  );
}
