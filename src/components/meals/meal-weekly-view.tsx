"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format, subDays, parseISO } from "date-fns";
import type { MealLog } from "@/lib/types";

interface MealWeeklyViewProps {
  logs: MealLog[];
  currentDate: string;
}

export function MealWeeklyView({ logs, currentDate }: MealWeeklyViewProps) {
  const days = useMemo(() => {
    const base = parseISO(currentDate);
    return Array.from({ length: 7 }, (_, i) => {
      const d = subDays(base, 6 - i);
      const dateStr = format(d, "yyyy-MM-dd");
      const log = logs.find((l) => l.date === dateStr);
      return {
        date: dateStr,
        dayLabel: format(d, "EEE"),
        dateLabel: format(d, "d"),
        meals: log ? log.totalMeals : -1,
      };
    });
  }, [logs, currentDate]);

  const getColor = (meals: number) => {
    if (meals < 0) return "#21262D";
    if (meals === 5) return "#3FB950";
    if (meals >= 4) return "#3FB95080";
    if (meals >= 3) return "#D2992260";
    if (meals >= 1) return "#E9456040";
    return "#21262D";
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        Last 7 Days
      </p>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const isToday = day.date === currentDate;
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`flex flex-col items-center gap-1 py-2 rounded-[10px] ${
                isToday ? "ring-1 ring-[#E94560]" : ""
              }`}
            >
              <span className="text-[10px] text-[#8B949E]">
                {day.dayLabel}
              </span>
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center text-xs font-bold transition-colors"
                style={{
                  backgroundColor: getColor(day.meals),
                  color: day.meals >= 3 ? "#E6EDF3" : day.meals >= 0 ? "#8B949E" : "#30363D",
                }}
              >
                {day.meals >= 0 ? `${day.meals}` : "—"}
              </div>
              <span className="text-[10px] text-[#8B949E]">
                {day.dateLabel}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
