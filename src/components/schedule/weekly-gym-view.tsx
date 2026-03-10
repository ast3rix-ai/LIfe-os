"use client";

import { motion } from "framer-motion";
import { Dumbbell, TreePine } from "lucide-react";

const WEEK = [
  { day: "Mon", gym: "A", label: "Upper Push", hasGym: true },
  { day: "Tue", gym: "B", label: "Lower", hasGym: true },
  { day: "Wed", gym: null, label: "Rest / Walk", hasGym: false },
  { day: "Thu", gym: "C", label: "Upper Pull", hasGym: true },
  { day: "Fri", gym: "D", label: "Lower + Core", hasGym: true },
  { day: "Sat", gym: null, label: "Rest / Walk", hasGym: false },
  { day: "Sun", gym: null, label: "Rest", hasGym: false },
];

export function WeeklyGymView() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        Weekly Split
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {WEEK.map((w, i) => {
          const isToday = i === todayIdx;
          return (
            <motion.div
              key={w.day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-[10px] text-center ${
                isToday ? "ring-1 ring-[#E94560] bg-[#E9456008]" : ""
              }`}
            >
              <span
                className={`text-[10px] font-medium ${
                  isToday ? "text-[#E94560]" : "text-[#8B949E]"
                }`}
              >
                {w.day}
              </span>
              <div
                className={`w-9 h-9 rounded-[8px] flex items-center justify-center ${
                  w.hasGym ? "bg-[#3FB95015]" : "bg-[#21262D]"
                }`}
              >
                {w.hasGym ? (
                  <Dumbbell className="w-4 h-4 text-[#3FB950]" />
                ) : (
                  <TreePine className="w-3.5 h-3.5 text-[#8B949E]" />
                )}
              </div>
              <span className="text-[9px] text-[#8B949E] leading-tight">
                {w.hasGym ? `Day ${w.gym}` : w.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
