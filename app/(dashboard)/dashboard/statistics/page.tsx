import StatisticsTab from "@/components/StatisticsTab/StatisticsTab";
import { StatisticsProvider } from "@/lib/context/StatisticsContext";

export default function StatisticsPage() {
  return (
    <StatisticsProvider>
      <section>
        <StatisticsTab />
      </section>
    </StatisticsProvider>
  );
}
