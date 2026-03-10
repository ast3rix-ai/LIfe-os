"use client";

import { motion } from "framer-motion";
import { Sun, Coffee, Sunset, Moon } from "lucide-react";
import type { SupplementItem, SupplementTimeBlock } from "@/lib/types";
import { SupplementCheckbox } from "./supplement-checkbox";

interface TimeBlockCardProps {
  timeBlock: SupplementTimeBlock;
  label: string;
  time: string;
  items: SupplementItem[];
  onToggle: (name: string, checked: boolean) => void;
  index: number;
}

const icons: Record<SupplementTimeBlock, typeof Sun> = {
  morning: Sun,
  lunch: Coffee,
  evening: Sunset,
  bedtime: Moon,
};

const colors: Record<SupplementTimeBlock, string> = {
  morning: "#D29922",
  lunch: "#58A6FF",
  evening: "#E94560",
  bedtime: "#BC8CFF",
};

export function TimeBlockCard({
  timeBlock,
  label,
  time,
  items,
  onToggle,
  index,
}: TimeBlockCardProps) {
  const Icon = icons[timeBlock];
  const color = colors[timeBlock];
  const completed = items.filter((i) => i.taken).length;
  const total = items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#E6EDF3]">{label}</p>
            <p className="text-[11px] text-[#8B949E]">{time}</p>
          </div>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            color,
            backgroundColor: `${color}15`,
          }}
        >
          {completed}/{total}
        </span>
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <SupplementCheckbox
            key={item.name}
            name={item.name}
            checked={item.taken}
            onChange={(checked) => onToggle(item.name, checked)}
          />
        ))}
      </div>
    </motion.div>
  );
}
