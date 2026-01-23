"use client";

import { useState, useRef, useEffect } from "react";
import css from "../Select.module.css";
import { useStatistics } from "../../../../../lib/context/StatisticsContext";

export function YearSelect() {
  const { year: value, setYear: onChange, yearsRange: years } = useStatistics();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={css.select} ref={ref}>
      <button
        className={`${css.select__toggle} ${isOpen ? css.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
        <svg
          width="24"
          height="24"
          className={`${css.select__arrow} ${isOpen ? css.open : ""}`}
        >
          <use href="/sprite.svg#icon-select-arrow" />
        </svg>
      </button>

      <div className={`${css.select__dropdown} ${isOpen ? css.open : ""}`}>
        {years
          .sort((a, b) => b - a)
          .map((year) => (
            <div
              key={year}
              className={`${css.select__item} ${
                value === String(year) ? css.active : ""
              }`}
              onClick={() => {
                onChange(String(year)); // контекст зберігає рік як string
                setIsOpen(false);
              }}
            >
              {year}
            </div>
          ))}
      </div>
    </div>
  );
}
