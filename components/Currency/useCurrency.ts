"use client";

import { useEffect, useState } from "react";

const MONO_URL = "/api/currency";
const ONE_HOUR = 60 * 60 * 1000;

type CurrencyRate = {
  currencyCodeA: number;
  currencyCodeB: number;
  rateBuy?: number;
  rateSell?: number;
};

export function useCurrency() {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cachedData = localStorage.getItem("currencyData");
    const cachedTime = localStorage.getItem("currencyTimestamp");

    if (cachedData && cachedTime) {
      const isFresh = Date.now() - Number(cachedTime) < ONE_HOUR;

      if (isFresh) {
        setRates(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    const fetchCurrency = async () => {
      try {
        const res = await fetch(MONO_URL);
        if (!res.ok) throw new Error();

        const data: CurrencyRate[] = await res.json();

        const filtered = data.filter(
          (item) =>
            (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
            item.currencyCodeB === 980,
        );

        localStorage.setItem("currencyData", JSON.stringify(filtered));
        localStorage.setItem("currencyTimestamp", String(Date.now()));

        setRates(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  return { rates, loading, error };
}
