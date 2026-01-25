"use client";

import { RegisterBackground } from "@/components/Auth/RegisterBackground";
import RegistrationForm from "@/components/Auth/RegistrationForm";

export default function RegisterPage() {
  return (
    <main>
      <RegistrationForm />
      <RegisterBackground />
    </main>
  );
}
