"use client";

import styles from "./Currency.module.css";
import Image from "next/image";
import { useCurrency } from "@/components/Currency/useCurrency";

const Currency = () => {
  const { rates, loading, error } = useCurrency();

  const usd = rates.find(
    (r) => r.currencyCodeA === 840 && r.currencyCodeB === 980,
  );
  const eur = rates.find(
    (r) => r.currencyCodeA === 978 && r.currencyCodeB === 980,
  );

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Failed to load exchange rates</div>;
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
                <td>{usd.rateBuy?.toFixed(2)}</td>
                <td>{usd.rateSell?.toFixed(2)}</td>
              </tr>
            )}
            {eur && (
              <tr>
                <td>EUR</td>
                <td>{eur.rateBuy?.toFixed(2)}</td>
                <td>{eur.rateSell?.toFixed(2)}</td>
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
