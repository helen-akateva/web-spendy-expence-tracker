"use client";

import styles from "./Sidebar.module.css";
import Navigation from "./Navigation";
import Ballance from "./Ballance";
import Currency from "./Currency";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Sidebar() {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <aside className={styles.sidebarContainer}>
      <Navigation />
      {isTablet && (
        <>
          <Ballance />
          {!isDesktop && <Currency />}
        </>
      )}
    </aside>
  );
}
