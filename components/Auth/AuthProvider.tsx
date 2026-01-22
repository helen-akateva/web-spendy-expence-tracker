"use client";

import { authApi } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authApi
      .refresh()
      .then(setUser)
      .catch(logout)
      .finally(() => setChecking(false));
  }, [setUser, logout]);

  return (
    <>
      {checking && <Loader />}
      {!checking && children}
    </>
  );
}
