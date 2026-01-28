"use client";

import { useCurrency } from "./useCurrency";
import { Loader } from "@/components/Loader/Loader";
import styles from "./Currency.module.css";
import Image from "next/image";

const Currency = () => {
  const { rates, loading, error } = useCurrency();

  const usd = rates.find(
    (r) => r.currencyCodeA === 840 && r.currencyCodeB === 980,
  );
  const eur = rates.find(
    (r) => r.currencyCodeA === 978 && r.currencyCodeB === 980,
  );

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>Failed to load currency</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Table header */}
        <div className={styles.header}>
          <span>Currency</span>
          <span>Purchase</span>
          <span>Sale</span>
        </div>

        {/* Rows */}
        <div className={styles.body}>
          {usd && (
            <div className={styles.row}>
              <span className={styles.currency}>USD</span>
              <span>{usd.rateBuy?.toFixed(2)}</span>
              <span>{usd.rateSell?.toFixed(2)}</span>
            </div>
          )}
          {eur && (
            <div className={styles.row}>
              <span className={styles.currency}>EUR</span>
              <span>{eur.rateBuy?.toFixed(2)}</span>
              <span>{eur.rateSell?.toFixed(2)}</span>
            </div>
          )}
        </div>

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
