"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authApi } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { Loader } from "../Loader/Loader";
import axios from "axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const logout = useAuthStore((s) => s.logout);
	const user = useAuthStore((s) => s.user);

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
				const success = await authApi.refresh();

				if (!success && user && !cancelled) {
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
		};

		refreshSession();

		return () => {
			cancelled = true;
		};
	}, [pathname, logout, user]);

	if (checking) {
		return (
			<div className="auth-loader-overlay">
				<Loader size={80} />
			</div>
		);
	}

	return <>{children}</>;
}
