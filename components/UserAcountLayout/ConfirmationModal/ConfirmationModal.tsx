import css from "./ConfirmationModal.module.css";
import { authApi } from "../../../lib/services/authService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";

interface ConfirmationModalProps {
  setIsModalOpen: (value: boolean) => void;
}

export default function ConfirmationModal({
  setIsModalOpen,
}: ConfirmationModalProps) {
  const router = useRouter();

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleLogout = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await authApi.logout();

      localStorage.clear();

      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // 5. Редірект на логін
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      toast.success("Logged out successfully");
    }
  };
  return (
    <>
      <div className={css.modalBackdrop} onClick={closeModal}></div>
      <div className={css.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalLogoBlock}>
          <div className={css.modalLogo}>
            <svg width="54" height="54">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </div>
          <div className={css.modalLogoText}>Spendy</div>
        </div>

        <p className={css.modalText}>Are you sure you want to log out?</p>

        <button
          className={css.modalLogoutBtn}
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>

        <button
          className={css.modalCancelBtn}
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
