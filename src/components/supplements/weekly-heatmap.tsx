"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format, subDays, parseISO } from "date-fns";
import type { SupplementLog } from "@/lib/types";

interface WeeklyHeatmapProps {
  logs: SupplementLog[];
  currentDate: string;
}

export function WeeklyHeatmap({ logs, currentDate }: WeeklyHeatmapProps) {
  const days = useMemo(() => {
    const result = [];
    const base = parseISO(currentDate);
    for (let i = 6; i >= 0; i--) {
      const d = subDays(base, i);
      const dateStr = format(d, "yyyy-MM-dd");
      const log = logs.find((l) => l.date === dateStr);
      const rate = log ? log.completionRate : -1; // -1 = no data
      result.push({
        date: dateStr,
        dayLabel: format(d, "EEE"),
        dateLabel: format(d, "d"),
        rate,
      });
    }
    return result;
  }, [logs, currentDate]);

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        Last 7 Days
      </p>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const bg =
            day.rate < 0
              ? "#21262D"
              : day.rate === 0
              ? "#21262D"
              : day.rate < 40
              ? "#E9456030"
              : day.rate < 70
              ? "#D2992240"
              : day.rate < 100
              ? "#3FB95060"
              : "#3FB950";
          const isToday = day.date === currentDate;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-[10px] ${
                isToday ? "ring-1 ring-[#E94560]" : ""
              }`}
            >
              <span className="text-[10px] text-[#8B949E]">
                {day.dayLabel}
              </span>
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center text-xs font-bold transition-colors"
                style={{
                  backgroundColor: bg,
                  color:
                    day.rate >= 70 ? "#E6EDF3" : day.rate >= 0 ? "#8B949E" : "#30363D",
                }}
              >
                {day.rate >= 0 ? `${Math.round(day.rate)}%` : "—"}
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
