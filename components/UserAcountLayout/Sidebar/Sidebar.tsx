"use client";

import styles from "./Sidebar.module.css";
import Navigation from "./Navigation";
import Balance from "./Balance";
import Currency from "./Currency";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 767.9px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <aside className={styles.sidebarContainer}>
      <Navigation />
      {isMobile && isActive("/transactions") && <Balance />}
      {isTablet && (
        <>
          <Balance />
          <Currency />
        </>
      )}

      {isDesktop && (
        <div className={styles.accountContainer}>
          <Balance />
          <Currency />
        </div>
      )}
    </aside>
  );
}
