import { useEffect, useState } from "react";
import { useFinanceStore } from "@/lib/stores/financeStore";

const MONO_URL = "/api/currency";
const ONE_HOUR = 60 * 60 * 1000;

export function useCurrency() {
  const currency = useFinanceStore((s) => s.currency);
  const setCurrency = useFinanceStore((s) => s.setCurrency);
  const { rates, lastFetched } = currency;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const isFresh = Date.now() - lastFetched < ONE_HOUR;

    if (isFresh && rates.length > 0) {
      setLoading(false);
      return;
    }

    if (useFinanceStore.getState().isLoadingCurrency) {
      setLoading(true);
      return;
    }

    const fetchCurrency = async () => {
      useFinanceStore.setState({ isLoadingCurrency: true });
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(MONO_URL);
        if (!res.ok) throw new Error();

        const data: any[] = await res.json();

        // Convert API response to store format if needed, or filter
        // Assuming the API returns the same structure we want to store
        // But let's filter just in case to match previous logic
        const filtered = data.filter(
          (item) =>
            (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
            item.currencyCodeB === 980,
        );

        setCurrency({
          rates: filtered,
          lastFetched: Date.now(),
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
        useFinanceStore.setState({ isLoadingCurrency: false });
      }
    };

    fetchCurrency();
  }, [lastFetched, rates.length, setCurrency]);

  return { rates, loading, error };
}
