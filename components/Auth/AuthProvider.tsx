"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authApi } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/store/authStore";
import { Loader } from "../Loader/Loader";
import axios from "axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");

    if (isAuthPage) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    const refreshSession = async () => {
      try {
        const user = await authApi.refresh();

        if (!cancelled) {
          setUser(user);
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          isAuthenticated
        ) {
          if (!cancelled) {
            logout();
          }
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    };

    refreshSession();

    return () => {
      cancelled = true;
    };
  }, [pathname, setUser, logout, isAuthenticated]);

  if (checking) {
    return <Loader />;
  }

  return <>{children}</>;
}
