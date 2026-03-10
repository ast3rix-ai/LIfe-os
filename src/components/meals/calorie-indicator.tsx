"use client";

import { motion } from "framer-motion";

interface CalorieIndicatorProps {
  totalMeals: number;
}

const LEVELS: Record<
  number,
  { range: string; label: string; color: string }
> = {
  5: { range: "~2400-2600 kcal", label: "ON TARGET", color: "#3FB950" },
  4: { range: "~2000-2200 kcal", label: "Close", color: "#D29922" },
  3: { range: "~1400-1600 kcal", label: "Below target", color: "#DB6D28" },
};

export function CalorieIndicator({ totalMeals }: CalorieIndicatorProps) {
  const level = LEVELS[totalMeals] ?? {
    range: "~800-1000 kcal",
    label: "Critical",
    color: "#E94560",
  };

  const pct = (totalMeals / 5) * 100;

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#E6EDF3]">
          <span className="font-bold" style={{ color: level.color }}>
            {totalMeals}/5
          </span>{" "}
          meals eaten
        </p>
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{
            color: level.color,
            backgroundColor: `${level.color}15`,
          }}
        >
          {level.label}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[#21262D] overflow-hidden mb-1.5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: level.color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-[#8B949E]">
        Est. {level.range} — {level.label}
      </p>
    </div>
  );
}
