"use client";

import { MonthlySummaryResponse } from "@/lib/api/summaryApi";
import css from "./StatisticsTable.module.css";
import { useStatistics } from "@/lib/context/StatisticsContext";
import { Loader } from "@/components/Loader/Loader";
import { useEffect, useState } from "react";

interface StatisticsTableProps {
  summary: MonthlySummaryResponse | null;
}

export default function StatisticsTable({ summary }: StatisticsTableProps) {
  const { toggle, loading, categoryColors } = useStatistics();
  const [isExpense, setExpense] = useState(true);

  useEffect(() => {
    setExpense(toggle !== "income");
  }, [toggle]);

  if (loading || !summary) {
    return <Loader />;
  }

  const filteredCategories = summary.categories.filter(
    (c) => c.type === (isExpense ? "expense" : "income"),
  );

  const total = isExpense
    ? summary.totals.totalExpense
    : summary.totals.totalIncome;

  return (
    <div>
      <div className={css["table-header"]}>
        <p className={css["table-header-text"]}>Category</p>
        <p className={css["table-header-text"]}>Sum</p>
      </div>

      <ul className={css["table-list"]}>
        {filteredCategories.map((c) => (
          <li key={c.category} className={css["table-list-item"]}>
            <div
              className={css["category-color"]}
              style={{ backgroundColor: categoryColors[c.category] }}
            ></div>
            <p className={css["category-name"]}>{c.category}</p>
            <p>{c.total}</p>
          </li>
        ))}

        <li className={css["table-list-total"]}>
          <p className={css["table-list-total-type"]}>
            {isExpense ? "Expenses:" : "Income:"}
          </p>
          <p
            className={
              isExpense
                ? css["table-list-total-amount-expense"]
                : css["table-list-total-amount-income"]
            }
          >
            {total}
          </p>
        </li>
      </ul>
    </div>
  );
}
