"use client";

import { LoginBackground } from "@/components/Auth/LoginBackground";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
      <LoginBackground />
    </main>
  );
}
