"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Navigation() {
  const isMobile = useMediaQuery("(max-width: 743.8px)");
  const isTablet = useMediaQuery("(min-width: 744px)");

  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;
  return (
    <div>
      {isMobile && (
        <nav>
          <ul className={styles.navPanel}>
            <li
              className={`${styles.navIcon} ${
                isActive("/dashboard") ? styles.activePath : ""
              }`}
            >
              <Link href="/dashboard">
                <svg width="38" height="38">
                  <use href="/sprite.svg#icon-home" />
                </svg>
              </Link>
            </li>

            <li
              className={`${styles.navIcon} ${
                isActive("/dashboard/statistics") ? styles.activePath : ""
              }`}
            >
              <Link href="/dashboard/statistics">
                <svg width="38" height="38">
                  <use href="/sprite.svg#icon-statistics" />
                </svg>
              </Link>
            </li>

            <li
              className={`${styles.navIcon} ${
                isActive("/dashboard/currency") ? styles.activePath : ""
              }`}
            >
              <Link href="/dashboard/currency">
                <svg width="38" height="38">
                  <use href="/sprite.svg#icon-currency" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isTablet && (
        <div>
          <nav className={styles.navContainer}>
            <ul className={styles.navPanel}>
              <li className={styles.navPanelItem}>
                <div
                  className={`${styles.navIcon} ${
                    isActive("/dashboard") ? styles.activePath : ""
                  }`}
                >
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-home" />
                  </svg>
                </div>
                <p
                  className={`${styles.navText} ${
                    isActive("/dashboard") ? styles.activeText : ""
                  }`}
                >
                  <Link href="/dashboard">Home</Link>
                </p>
              </li>
              <li className={styles.navPanelItem}>
                <div
                  className={`${styles.navIcon} ${
                    isActive("/dashboard/statistics") ? styles.activePath : ""
                  }`}
                >
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-statistics" />
                  </svg>
                </div>
                <p
                  className={`${styles.navText} ${
                    isActive("/dashboard/statistics") ? styles.activeText : ""
                  }`}
                >
                  <Link href="/dashboard/statistics">Statistics</Link>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
