"use client";

import { LoginBackground } from "@/components/Auth/LoginBackground";
import LoginForm from "@/components/Auth/LoginForm";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return null;
  }
  return (
    <main>
      <LoginForm />
      <LoginBackground />
    </main>
  );
}
