"use client";

import { useStatistics } from "../../lib/context/StatisticsContext";
import Chart from "./Chart/Chart";
import StatisticsDashboard from "./StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "./StatisticsTable/StatisticsTable";
import Toggle from "./Toggle/Toggle";
import css from "./StatisticsTab.module.css";

export default function StatisticsTab() {
  const { summary } = useStatistics();

  return (
    <div className={css["stat-tab-container"]}>
      <div className={css["chart-wrapper"]}>
        <Toggle />
        <Chart />
      </div>
      <div>
        <StatisticsDashboard />
        <StatisticsTable summary={summary} />
      </div>
    </div>
  );
}
