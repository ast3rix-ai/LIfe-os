"use client";

import { motion } from "framer-motion";

interface NonNegotiableCirclesProps {
  value: number;
  onChange: (value: number) => void;
}

export function NonNegotiableCircles({
  value,
  onChange,
}: NonNegotiableCirclesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#E6EDF3]">
          Non-Negotiables
        </span>
        <span className="text-sm text-[#8B949E]">{value}/5</span>
      </div>
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= value;
          return (
            <button
              key={i}
              onClick={() => onChange(i === value ? i - 1 : i)}
              className="relative w-10 h-10 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E94560]/50"
              style={{
                borderColor: filled ? "#E94560" : "#30363D",
                backgroundColor: filled ? "#E94560" : "transparent",
              }}
            >
              {filled && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
