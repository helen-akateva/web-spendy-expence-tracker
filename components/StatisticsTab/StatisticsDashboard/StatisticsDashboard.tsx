"use client";

import { MonthSelect } from "./Select/MonthSelect/MonthSelect";
import css from "./StatisticsDashboard.module.css";
import { YearSelect } from "./Select/YearSelect/YearSelect";

export default function StatisticsDashboard() {
  return (
    <div className={css["stat-dashboard-container"]}>
      <div
        className={`${css["stat-dasboard-select"]} ${css["stat-dashboard-month"]}`}
      >
        <MonthSelect />
      </div>
      <div
        className={`${css["stat-dasboard-select"]} ${css["stat-dashboard-year"]}`}
      >
        <YearSelect />
      </div>
    </div>
  );
}
