import Sidebar from "@/components/UserAcountLayout/Sidebar/Sidebar";
import styles from "./SidebarPage.module.css";

const SidebarPage = async () => {
  return (
    <section className={styles.sidebarPage}>
      <Sidebar />
    </section>
  );
};

export default SidebarPage;
