"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { parseISO, startOfWeek, subWeeks, isWithinInterval } from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface WeekComparisonCardsProps {
  checkins: DailyCheckin[];
}

interface StatData {
  label: string;
  currentAvg: number;
  previousAvg: number;
  color: string;
}

function weekAvg(
  checkins: DailyCheckin[],
  weekStart: Date,
  field: keyof Pick<DailyCheckin, "anxiety" | "depression" | "dpdr">
): number {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const inWeek = checkins.filter((c) =>
    isWithinInterval(parseISO(c.date), { start: weekStart, end: weekEnd })
  );
  if (inWeek.length === 0) return 0;
  return +(inWeek.reduce((s, c) => s + c[field], 0) / inWeek.length).toFixed(1);
}

export function WeekComparisonCards({ checkins }: WeekComparisonCardsProps) {
  const stats = useMemo<StatData[]>(() => {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const lastWeekStart = subWeeks(thisWeekStart, 1);

    return [
      {
        label: "Anxiety",
        currentAvg: weekAvg(checkins, thisWeekStart, "anxiety"),
        previousAvg: weekAvg(checkins, lastWeekStart, "anxiety"),
        color: "#E94560",
      },
      {
        label: "Depression",
        currentAvg: weekAvg(checkins, thisWeekStart, "depression"),
        previousAvg: weekAvg(checkins, lastWeekStart, "depression"),
        color: "#58A6FF",
      },
      {
        label: "DPDR",
        currentAvg: weekAvg(checkins, thisWeekStart, "dpdr"),
        previousAvg: weekAvg(checkins, lastWeekStart, "dpdr"),
        color: "#BC8CFF",
      },
    ];
  }, [checkins]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const diff = stat.previousAvg
          ? ((stat.currentAvg - stat.previousAvg) / stat.previousAvg) * 100
          : 0;
        const isDown = diff < -1;
        const isUp = diff > 1;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: stat.color }}
              />
              <span className="text-sm font-medium text-[#E6EDF3]">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#E6EDF3] tabular-nums">
              {stat.currentAvg || "—"}
            </p>
            <p className="text-xs text-[#8B949E] mt-0.5">
              This week avg
            </p>
            {stat.previousAvg > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                {isDown ? (
                  <TrendingDown className="w-3.5 h-3.5 text-[#3FB950]" />
                ) : isUp ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#E94560]" />
                ) : (
                  <Minus className="w-3.5 h-3.5 text-[#8B949E]" />
                )}
                <span
                  className="text-xs font-medium"
                  style={{
                    color: isDown ? "#3FB950" : isUp ? "#E94560" : "#8B949E",
                  }}
                >
                  {Math.abs(diff).toFixed(0)}% vs last week
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
