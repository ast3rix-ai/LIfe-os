"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 30,
}: NumberStepperProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[#E6EDF3]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:bg-[#30363D] hover:text-[#E6EDF3] transition-colors disabled:opacity-30"
          disabled={value <= min}
        >
          <Minus className="w-4 h-4" />
        </button>
        <motion.span
          key={value}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-[#E6EDF3] w-8 text-center tabular-nums"
        >
          {value}
        </motion.span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:bg-[#30363D] hover:text-[#E6EDF3] transition-colors disabled:opacity-30"
          disabled={value >= max}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
