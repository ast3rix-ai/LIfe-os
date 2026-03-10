"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { MealEntry } from "@/lib/types";

interface MealCardProps {
  label: string;
  time: string;
  entry: MealEntry;
  onToggle: () => void;
  onNoteChange: (note: string) => void;
  index: number;
  icon: React.ReactNode;
}

export function MealCard({
  label,
  time,
  entry,
  onToggle,
  onNoteChange,
  index,
  icon,
}: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`border rounded-[12px] transition-all duration-300 overflow-hidden ${
        entry.eaten
          ? "bg-[#3FB95010] border-[#3FB95040]"
          : "bg-[#161B22] border-[#30363D]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        {/* Check circle */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            entry.eaten
              ? "bg-[#3FB950]"
              : "border-2 border-[#30363D]"
          }`}
        >
          {entry.eaten ? (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.div>
          ) : (
            <Circle className="w-5 h-5 text-[#30363D]" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold transition-colors ${
              entry.eaten ? "text-[#3FB950]" : "text-[#E6EDF3]"
            }`}
          >
            {label}
          </p>
          <p className="text-[11px] text-[#8B949E]">{time}</p>
        </div>

        {/* Icon */}
        <div className="text-[#8B949E] shrink-0">{icon}</div>
      </button>

      {/* Optional note */}
      {entry.eaten && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-4 pb-3"
        >
          <input
            type="text"
            placeholder="What did you eat? (optional)"
            value={entry.note || ""}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onNoteChange(e.target.value)}
            className="w-full bg-[#0D1117] border border-[#30363D] rounded-[8px] px-3 py-2 text-xs text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#3FB95060] focus:outline-none transition-colors"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
