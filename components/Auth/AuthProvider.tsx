"use client";

import { authApi } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

const PUBLIC_ROUTES = ["/login", "/register"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authApi
      .refresh()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        logout();

        if (!PUBLIC_ROUTES.includes(pathname)) {
          router.replace("/login");
        }
      })
      .finally(() => {
        setChecking(false);
      });
  }, [pathname, logout, router, setUser]);

  if (checking) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <Loader size={60} />
      </div>
    );
  }

  return <>{children}</>;
}
