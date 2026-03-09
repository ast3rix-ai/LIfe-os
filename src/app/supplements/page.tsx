"use client";

import { motion } from "framer-motion";
import { Pill } from "lucide-react";

export default function SupplementsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Pill className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Supplements</h2>
      </div>
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-8 flex flex-col items-center justify-center min-h-[300px]">
        <Pill className="w-12 h-12 text-[#8B949E] mb-4" />
        <p className="text-[#8B949E] text-sm">
          Track your daily supplement intake
        </p>
        <p className="text-[#8B949E]/60 text-xs mt-2">Coming soon</p>
      </div>
    </motion.div>
  );
}
