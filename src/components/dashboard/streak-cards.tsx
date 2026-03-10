"use client";

import { motion } from "framer-motion";
import { Flame, Pill, Dumbbell, ShieldCheck } from "lucide-react";

interface StreakCardsProps {
  loggingStreak: number;
  supplementStreak: number;
  gymThisWeek: number;
  daysSinceGambling: number;
}

const cards = [
  { key: "logging", icon: Flame, color: "#E94560" },
  { key: "supplement", icon: Pill, color: "#58A6FF" },
  { key: "gym", icon: Dumbbell, color: "#3FB950" },
  { key: "gambling", icon: ShieldCheck, color: "#D29922" },
];

export function StreakCards({
  loggingStreak,
  supplementStreak,
  gymThisWeek,
  daysSinceGambling,
}: StreakCardsProps) {
  const data = [
    { label: "Daily logging streak", value: `${loggingStreak} days` },
    { label: "Supplement streak", value: `${supplementStreak} days at 100%` },
    { label: "Gym this week", value: `${gymThisWeek}/4 sessions` },
    { label: "Days since gambling", value: `${daysSinceGambling} days` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {data.map((d, i) => {
        const c = cards[i];
        return (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-3.5 text-center"
          >
            <div
              className="w-8 h-8 rounded-[8px] flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `${c.color}15` }}
            >
              <c.icon className="w-4 h-4" style={{ color: c.color }} />
            </div>
            <p
              className="text-sm font-bold tabular-nums"
              style={{ color: c.color }}
            >
              {d.value}
            </p>
            <p className="text-[10px] text-[#8B949E] mt-0.5">{d.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
