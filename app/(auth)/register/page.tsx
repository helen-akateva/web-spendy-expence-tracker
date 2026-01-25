"use client";

import { RegisterBackground } from "@/components/Auth/RegisterBackground";
import RegistrationForm from "@/components/Auth/RegistrationForm";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
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
      <RegistrationForm />
      <RegisterBackground />
    </main>
  );
}
