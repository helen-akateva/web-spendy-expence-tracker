"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Головна сторінка редіректить на /transactions (HomeTab згідно з ТЗ)
    router.replace("/transactions");
  }, [router]);

  return null;
}
