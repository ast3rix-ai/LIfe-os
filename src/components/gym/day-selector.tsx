"use client";

import { motion } from "framer-motion";
import type { GymDay } from "@/lib/types";
import { DAY_META } from "@/lib/gym-templates";

interface DaySelectorProps {
  selected: GymDay;
  onChange: (day: GymDay) => void;
}

const days: GymDay[] = ["A", "B", "C", "D"];

export function DaySelector({ selected, onChange }: DaySelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {days.map((d) => {
        const meta = DAY_META[d];
        const isActive = d === selected;
        return (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`relative rounded-[12px] border p-3 transition-all duration-200 text-center ${
              isActive
                ? "border-[#E94560] bg-[#E9456015]"
                : "border-[#30363D] bg-[#161B22] hover:border-[#8B949E]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="gym-day-pill"
                className="absolute inset-0 rounded-[12px] border-2 border-[#E94560]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <p
              className={`text-sm font-bold ${
                isActive ? "text-[#E94560]" : "text-[#E6EDF3]"
              }`}
            >
              {meta.label}
            </p>
            <p className="text-[10px] text-[#8B949E] mt-0.5">
              {meta.subtitle}
            </p>
            <p className="text-[10px] text-[#8B949E]">{meta.weekday}</p>
          </button>
        );
      })}
    </div>
  );
}
