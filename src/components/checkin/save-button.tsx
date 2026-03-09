"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Check } from "lucide-react";

interface SaveButtonProps {
  onSave: () => void;
}

export function SaveButton({ onSave }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`w-full py-3.5 rounded-[12px] font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
        saved
          ? "bg-[#3FB950] text-white"
          : "bg-[#E94560] text-white hover:bg-[#E94560]/90"
      }`}
    >
      <AnimatePresence mode="wait">
        {saved ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>Saved!</span>
          </motion.div>
        ) : (
          <motion.div
            key="save"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Check-in</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
