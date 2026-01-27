"use client";

import { useFinanceStore } from "@/lib/stores/financeStore";
import styles from "./Currency.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CurrencyRate } from "../../../lib/stores/financeStore";

const MONOBANK_API = "https://api.monobank.ua/bank/currency";
const CACHE_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const Currency = () => {
  const currency = useFinanceStore((s) => s.currency);
  const setCurrency = useFinanceStore((s) => s.setCurrency);
  const { rates, lastFetched } = currency;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (now - lastFetched > CACHE_TIME || rates.length === 0) {
      fetchRates();
    }
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(MONOBANK_API);
      if (!res.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data: CurrencyRate[] = await res.json();
      setCurrency({
        rates: data,
        lastFetched: Date.now(),
      });
    } catch (err) {
      setError("Failed to load exchange rates");
      console.error("Currency fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const usd = rates.find(
    (r) => r.currencyCodeA === 840 && r.currencyCodeB === 980,
  );
  const eur = rates.find(
    (r) => r.currencyCodeA === 978 && r.currencyCodeB === 980,
  );

  if (loading) {
    return (
      <div className={styles.currencyContainer}>
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.currencyContainer}>
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.currencyContainer}>
      <div className={styles.header}>
        <div>Currency</div>
        <div>Purchase</div>
        <div>Sale</div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            {usd && (
              <tr>
                <td>USD</td>
                <td>{usd.rateBuy.toFixed(2)}</td>
                <td>{usd.rateSell.toFixed(2)}</td>
              </tr>
            )}
            {eur && (
              <tr>
                <td>EUR</td>
                <td>{eur.rateBuy.toFixed(2)}</td>
                <td>{eur.rateSell.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Illustration */}
        <div className={styles.illustration}>
          <Image
            src="/images/dude1x.webp"
            alt="Wallet"
            width={234}
            height={174}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Currency;
