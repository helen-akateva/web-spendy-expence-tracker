"use client";

import css from "./Chart.module.css";
import { Pie, PieChart, Tooltip, TooltipIndex, Cell } from "recharts";
import { useStatistics } from "../../../lib/context/StatisticsContext";
import { Loader } from "@/components/Loader/Loader";
import { useMemo } from "react";

export default function Chart({
  isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  const { summary, toggle, loading, categoryColors } = useStatistics();
  const categories = useMemo(() => {
    return summary?.categories.filter((c) => c.type === toggle);
  }, [summary, toggle]);

  if (loading || !summary) {
    return (
      <div className={css["chart-container"]}>
        <div className={css["balance-amount"]}>
          <Loader />
        </div>
      </div>
    );
  }
  // Вибір даних залежно від toggle

  if (!categories || categories.length === 0) {
    return (
      <div className={css["chart-container"]}>
        <p className={css["chart-empty"]}>No data available</p>
      </div>
    );
  }

  // Формат для Recharts
  const data = categories.map((c) => ({
    name: c.category,
    value: c.total,
  }));

  return (
    <div className={css["chart-container"]}>
      <p className={css["balance-amount"]}>
        ₴{" "}
        {toggle === "income"
          ? summary.totals.totalIncome
          : summary.totals.totalExpense}
      </p>
      <PieChart
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "500px",
          maxHeight: "80vh",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          isAnimationActive={isAnimationActive}
        >
          {data.map((item) => (
            <Cell key={item.name} fill={categoryColors[item.name]} />
          ))}
        </Pie>

        <Tooltip defaultIndex={defaultIndex} />
      </PieChart>
    </div>
  );
}
