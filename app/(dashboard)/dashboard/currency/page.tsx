"use client";

import { useEffect, useState } from "react";
import Currency from "@/components/Currency/Currency";

const MOBILE_MAX_WIDTH = 743;

export default function CurrencyPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isMobile) {
    return null;
  }

  return <Currency />;
}
