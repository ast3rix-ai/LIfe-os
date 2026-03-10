"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SupplementCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SupplementCheckbox({
  name,
  checked,
  onChange,
}: SupplementCheckboxProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 w-full py-2 group"
    >
      <div
        className={`relative w-6 h-6 rounded-[7px] border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
          checked
            ? "bg-[#3FB950] border-[#3FB950]"
            : "border-[#30363D] group-hover:border-[#8B949E]"
        }`}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>
      <span
        className={`text-sm transition-all duration-200 ${
          checked
            ? "text-[#8B949E] line-through"
            : "text-[#E6EDF3] group-hover:text-white"
        }`}
      >
        {name}
      </span>
    </button>
  );
}
