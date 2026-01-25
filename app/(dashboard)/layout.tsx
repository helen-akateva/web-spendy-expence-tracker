import Header from "@/components/UserAcountLayout/Header/Header";
import Sidebar from "@/components/UserAcountLayout/Sidebar/Sidebar";
import styles from "./layout.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.dashboardWrapper}>
            <Header />
            <div className={styles.mainContent}>
                <Sidebar />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}
