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
              className={`${styles.navIcon} ${isActive("/transactions") ? styles.activePath : ""
                }`}
            >
              <Link href="/transactions">
                <svg width="38" height="38">
                  <use href="/sprite.svg#icon-home" />
                </svg>
              </Link>
            </li>

            <li
              className={`${styles.navIcon} ${isActive("/statistics") ? styles.activePath : ""
                }`}
            >
              <Link href="/statistics">
                <svg width="38" height="38">
                  <use href="/sprite.svg#icon-statistics" />
                </svg>
              </Link>
            </li>

            <li
              className={`${styles.navIcon} ${isActive("/currency") ? styles.activePath : ""
                }`}
            >
              <Link href="/currency">
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
                  className={`${styles.navIcon} ${isActive("/transactions") ? styles.activePath : ""
                    }`}
                >
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-home" />
                  </svg>
                </div>
                <p
                  className={`${styles.navText} ${isActive("/transactions") ? styles.activeText : ""
                    }`}
                >
                  <Link href="/transactions">Home</Link>
                </p>
              </li>
              <li className={styles.navPanelItem}>
                <div
                  className={`${styles.navIcon} ${isActive("/statistics") ? styles.activePath : ""
                    }`}
                >
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-statistics" />
                  </svg>
                </div>
                <p
                  className={`${styles.navText} ${isActive("/statistics") ? styles.activeText : ""
                    }`}
                >
                  <Link href="/statistics">Statistics</Link>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
