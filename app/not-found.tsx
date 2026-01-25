import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <svg width="80" height="80" className={styles.logo}>
          <use href="/sprite.svg#icon-logo" />
        </svg>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/transactions" className={styles.button}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
