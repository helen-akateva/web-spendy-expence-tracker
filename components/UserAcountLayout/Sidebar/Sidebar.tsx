"use client";

import styles from "./Sidebar.module.css";
import Navigation from "./Navigation";
import Balance from "./Balance";
import Currency from "./Currency";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Sidebar() {
  const isTablet = useMediaQuery("(min-width: 744px) and (max-width: 1279px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <aside className={styles.sidebarContainer}>
      <Navigation />

      {isTablet && (
        <>
          <Balance />
          <Currency />
        </>
      )}

      {isDesktop && (
        <div className={styles.balanceCurrencyWrapper}>
          <Balance />
          <Currency />
        </div>
      )}
    </aside>
  );
}
