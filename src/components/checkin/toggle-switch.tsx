"use client";

import { motion } from "framer-motion";

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleSwitch({ label, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[#E6EDF3]">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
          value ? "bg-[#E94560]" : "bg-[#21262D] border border-[#30363D]"
        }`}
      >
        <motion.div
          className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
          animate={{ left: value ? "22px" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
