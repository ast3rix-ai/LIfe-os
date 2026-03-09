"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Schedule</h2>
      </div>
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-8 flex flex-col items-center justify-center min-h-[300px]">
        <Calendar className="w-12 h-12 text-[#8B949E] mb-4" />
        <p className="text-[#8B949E] text-sm">
          Daily and weekly schedule planner
        </p>
        <p className="text-[#8B949E]/60 text-xs mt-2">Coming soon</p>
      </div>
    </motion.div>
  );
}
