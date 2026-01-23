"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { MONTHS } from "../constants/month";
import {
  MonthlySummaryResponse,
  getMonthlySummary,
  CurrentUser,
  getCurrentUser,
} from "../api/summaryApi";

const COLOR_PALETTE = [
  "#FF6B6B",
  "#4ECDC4",
  "#556270",
  "#C7F464",
  "#C44D58",
  "#FFA500",
  "#8A2BE2",
  "#20B2AA",
  "#FF1493",
  "#00CED1",
  "#FFD700",
  "#6495ED",
];

interface StatisticsContextValue {
  toggle: "income" | "expense";
  setToggle: (value: "income" | "expense") => void;

  month: string;
  setMonth: (value: string) => void;

  year: string;
  setYear: (value: string) => void;

  period: string;

  summary: MonthlySummaryResponse | null;
  loading: boolean;

  categoryColors: Record<string, string>;

  user: CurrentUser | null;
  loadingUser: boolean;
  yearsRange: number[];
}

const StatisticsContext = createContext<StatisticsContextValue | null>(null);

export function StatisticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // --------------------------
  // 1. INITIAL STATE FROM LOCAL STORAGE
  // --------------------------
  const [toggle, setToggle] = useState<"income" | "expense">(() => {
    return (
      (typeof window !== "undefined" &&
        (localStorage.getItem("stats-toggle") as "income" | "expense")) ||
      "expense"
    );
  });

  // Поточна дата
  const now = new Date();
  const currentMonthIndex = now.getMonth(); // від 0 до 11
  const currentYear = now.getFullYear();

  // Масив назв місяців у твоєму форматі
  const monthNames = Object.keys(MONTHS); // ["January", "February", ...]

  // Ініціалізація month
  const [month, setMonth] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stats-month");
      if (saved) return saved;
    }
    return monthNames[currentMonthIndex]; // ← поточний місяць
  });

  // Ініціалізація year
  const [year, setYear] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stats-year");
      if (saved) return saved;
    }
    return String(currentYear); // ← поточний рік
  });

  // Діапазон років
  const yearsRange = useMemo(() => {
    const years: number[] = [];
    for (let y = currentYear; y >= currentYear - 50; y--) {
      years.push(y);
    }
    return years;
  }, [currentYear]);

  // --------------------------
  // 2. PERSIST TO LOCAL STORAGE
  // --------------------------
  useEffect(() => {
    localStorage.setItem("stats-toggle", toggle);
  }, [toggle]);

  useEffect(() => {
    localStorage.setItem("stats-month", month);
  }, [month]);

  useEffect(() => {
    localStorage.setItem("stats-year", year);
  }, [year]);

  // --------------------------
  // 3. SUMMARY + USER LOADING
  // --------------------------
  const [summary, setSummary] = useState<MonthlySummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const period = `${year}-${MONTHS[month]}`;

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const data = await getMonthlySummary(period);
        setSummary(data);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [period]);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  // --------------------------
  // 4. CATEGORY COLORS
  // --------------------------
  const categoryColors = useMemo(() => {
    if (!summary) return {};

    const filtered = summary.categories.filter((c) => c.type === toggle);

    const map: Record<string, string> = {};
    filtered.forEach((c, index) => {
      map[c.category] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    });

    return map;
  }, [summary, toggle]);

  return (
    <StatisticsContext.Provider
      value={{
        toggle,
        setToggle,
        month,
        setMonth,
        year,
        setYear,
        period,
        summary,
        loading,
        categoryColors,
        user,
        loadingUser,
        yearsRange,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  const ctx = useContext(StatisticsContext);
  if (!ctx)
    throw new Error("useStatistics must be used inside StatisticsProvider");
  return ctx;
}
