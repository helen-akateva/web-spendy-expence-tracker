import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.container}>
        <Link href="/transactions">
          <div className={styles.logoWrapper}>
            <div>
              <svg width="31" height="31">
                <use href="/sprite.svg#icon-logo" />
              </svg>
            </div>
            <div className={styles.logoText}>Spendy</div>
          </div>
        </Link>
        <div className={styles.rightPanel}>
          <div className={styles.userName}>Name</div>
          <div className={styles.divider}></div>

          <div className={styles.exitBlock}>
            <div className={styles.exitIcon}>
              <svg width="18" height="18">
                <use href="/sprite.svg#icon-exit" />
              </svg>
            </div>
            <p>Exit</p>
          </div>
        </div>
      </div>
    </header>
  );
}
