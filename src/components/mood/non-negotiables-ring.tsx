"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { DailyCheckin } from "@/lib/types";

interface NonNegotiablesRingProps {
  checkins: DailyCheckin[];
}

export function NonNegotiablesRing({ checkins }: NonNegotiablesRingProps) {
  const { percentage, total, possible } = useMemo(() => {
    if (checkins.length === 0)
      return { percentage: 0, total: 0, possible: 0 };
    const total = checkins.reduce((s, c) => s + c.nonNegotiables, 0);
    const possible = checkins.length * 5;
    return {
      percentage: Math.round((total / possible) * 100),
      total,
      possible,
    };
  }, [checkins]);

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 flex flex-col items-center">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-4 self-start">
        Non-Negotiables Completion
      </p>
      <div className="relative w-[130px] h-[130px]">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#21262D"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#3FB950"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#E6EDF3]">
            {percentage}%
          </span>
        </div>
      </div>
      <p className="text-xs text-[#8B949E] mt-3">
        {total} / {possible} completed
      </p>
    </div>
  );
}
