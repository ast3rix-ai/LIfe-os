"use client";

import { motion } from "framer-motion";

interface GradientSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function getSliderColor(value: number, max: number): string {
  const ratio = (value - 1) / (max - 1);
  if (ratio <= 0.4) return "#3FB950";
  if (ratio <= 0.6) return "#D29922";
  return "#E94560";
}

export function GradientSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: GradientSliderProps) {
  const color = getSliderColor(value, max);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#E6EDF3]">{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-bold tabular-nums"
          style={{ color }}
        >
          {value}
        </motion.span>
      </div>
      <div className="relative h-2 rounded-full bg-[#21262D] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none bg-transparent cursor-pointer relative -mt-2 z-10 opacity-0"
        style={{ marginTop: "-8px" }}
      />
      <div className="flex justify-between text-[10px] text-[#8B949E] -mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
