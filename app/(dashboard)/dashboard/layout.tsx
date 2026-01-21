import Header from "@/components/UserAcountLayout/Header/Header";
import styles from "./Dashboard.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function DashboardLayout({ children, sidebar }: Props) {
  return (
    <>
      <Header />
      <div>
        <main className={styles.mainContainer}>
          {sidebar}
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}
