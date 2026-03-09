"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import { getStorageItem } from "@/lib/storage";
import type { DailyCheckin } from "@/lib/types";
import { MoodTrendChart } from "@/components/mood/mood-trend-chart";
import { WeekComparisonCards } from "@/components/mood/week-comparison-cards";
import { PanicBarChart } from "@/components/mood/panic-bar-chart";
import { NonNegotiablesRing } from "@/components/mood/non-negotiables-ring";
import { NicotineTrendChart } from "@/components/mood/nicotine-trend-chart";

const timeRanges = [
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 0 },
];

export default function MoodGraphPage() {
  const [checkins, setCheckins] = useState<DailyCheckin[]>([]);
  const [selectedRange, setSelectedRange] = useState(30);

  useEffect(() => {
    setCheckins(getStorageItem("daily-checkins"));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <LineChart className="w-6 h-6 text-[#E94560]" />
          <h2 className="text-xl font-bold text-[#E6EDF3]">Mood Graph</h2>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center bg-[#161B22] border border-[#30363D] rounded-[10px] p-1 gap-0.5">
          {timeRanges.map((range) => (
            <button
              key={range.days}
              onClick={() => setSelectedRange(range.days)}
              className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all duration-200 ${
                selectedRange === range.days
                  ? "bg-[#E94560] text-white"
                  : "text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Trend Chart */}
      <MoodTrendChart checkins={checkins} days={selectedRange} />

      {/* Week Comparison */}
      <WeekComparisonCards checkins={checkins} />

      {/* Bottom row: Panic + NNs Ring + Nicotine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PanicBarChart checkins={checkins} />
        <NonNegotiablesRing checkins={checkins} />
        <NicotineTrendChart checkins={checkins} />
      </div>
    </motion.div>
  );
}
