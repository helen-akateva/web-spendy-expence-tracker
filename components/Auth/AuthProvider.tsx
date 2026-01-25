"use client";

import { useEffect, useState } from "react";

import { authApi } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { Loader } from "../Loader/Loader";
import axios from "axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const logout = useAuthStore((s) => s.logout);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const success = await authApi.refresh();

        if (!success && !cancelled) {
          logout();
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          !cancelled
        ) {
          logout();
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [logout]);

  if (checking) {
    return (
      <div className="auth-loader-overlay">
        <Loader size={80} />
      </div>
    );
  }

  return <>{children}</>;
}
