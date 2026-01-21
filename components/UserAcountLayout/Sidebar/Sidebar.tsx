"use client";

import styles from "./Sidebar.module.css";
import Navigation from "./Navigation";
import Ballance from "./Ballance";
import Currency from "./Currency";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Sidebar() {
  const isTablet = useMediaQuery("(min-width: 744px)");

  return (
    <aside className={styles.sidebarContainer}>
      <Navigation />
      {isTablet && (
        <>
          <Ballance />
          <Currency />
        </>
      )}
    </aside>
  );
}
