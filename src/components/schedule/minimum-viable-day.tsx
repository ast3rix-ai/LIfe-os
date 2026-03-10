"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  UtensilsCrossed,
  TreePine,
  Phone,
  Pill,
} from "lucide-react";

const ITEMS = [
  { icon: BedDouble, text: "Get out of bed by 9:00 AM", color: "#8B949E" },
  { icon: UtensilsCrossed, text: "Eat 3 times", color: "#3FB950" },
  { icon: TreePine, text: "Go outside 15 minutes", color: "#3FB950" },
  { icon: Phone, text: "Text or call 1 person", color: "#BC8CFF" },
  {
    icon: Pill,
    text: "Take meds & supplements (Elicea, Magnesium, D3, NAC)",
    color: "#E94560",
  },
];

export function MinimumViableDay() {
  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 md:p-5 space-y-3">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-1">
        Bare minimum — no guilt
      </p>
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-3 py-2 px-3 rounded-[10px] border border-[#30363D]"
        >
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <item.icon className="w-4 h-4" style={{ color: item.color }} />
          </div>
          <p className="text-sm text-[#E6EDF3]">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
