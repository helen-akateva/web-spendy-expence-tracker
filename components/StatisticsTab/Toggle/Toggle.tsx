"use client";

import css from "./Toggle.module.css";
import { useStatistics } from "../../../lib/context/StatisticsContext";

export default function Toggle() {
  const { toggle, setToggle } = useStatistics();

  const isExpense = toggle === "expense";

  const handleBtnClick = () => {
    setToggle(isExpense ? "income" : "expense");
  };

  return (
    <div className={css["togle-container"]} onClick={handleBtnClick}>
      <p className={css["togle-text"]}>Income</p>

      <div className={css["togle-box"]}>
        <button
          className={
            isExpense
              ? `${css["togle-circle"]} ${css["expense-active"]}`
              : `${css["togle-circle"]}`
          }
        >
          <span className={`${css["line"]} ${css["vertical"]}`}></span>
          <span className={`${css["line"]} ${css["horizontal"]}`}></span>
        </button>
      </div>

      <p className={css["togle-text"]}>Expense</p>
    </div>
  );
}
