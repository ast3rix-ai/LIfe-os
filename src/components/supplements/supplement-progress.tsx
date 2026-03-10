"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface SupplementProgressProps {
  taken: number;
  total: number;
  streak: number;
}

export function SupplementProgress({
  taken,
  total,
  streak,
}: SupplementProgressProps) {
  const pct = total > 0 ? Math.round((taken / total) * 100) : 0;

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#E6EDF3]">
          <span className="text-[#3FB950] font-bold">{taken}</span>
          <span className="text-[#8B949E]">/{total}</span>{" "}
          supplements taken today
        </p>
        <span className="text-sm font-bold text-[#E6EDF3]">{pct}%</span>
      </div>
      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-[#21262D] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: pct === 100 ? "#3FB950" : "#E94560",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      {/* Streak */}
      <div className="flex items-center gap-2">
        <Flame
          className="w-4 h-4"
          style={{ color: streak > 0 ? "#D29922" : "#8B949E" }}
        />
        <p className="text-xs text-[#8B949E]">
          Current streak:{" "}
          <span className="text-[#E6EDF3] font-semibold">
            {streak} day{streak !== 1 ? "s" : ""}
          </span>{" "}
          of 100% completion
        </p>
      </div>
    </div>
  );
}
