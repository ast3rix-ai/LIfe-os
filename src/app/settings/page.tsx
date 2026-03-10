"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { SettingsThemeToggle } from "@/components/settings/theme-toggle";
import { SettingsDataManagement } from "@/components/settings/data-management";
import { SettingsSupplementEditor } from "@/components/settings/supplement-editor";
import { SettingsGymEditor } from "@/components/settings/gym-editor";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 pb-20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Settings</h2>
      </div>

      <div className="space-y-6">
        <SettingsThemeToggle />
        <SettingsDataManagement />
        <SettingsSupplementEditor />
        <SettingsGymEditor />

        <div className="pt-8 pb-4 text-center border-t border-[#30363D]">
          <p className="text-xs text-[#8B949E] font-medium tracking-wide">
            Filip Life OS v1.0 &mdash; Built March 2026
          </p>
          <p className="text-[10px] text-[#8B949E]/60 mt-2">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </p>
        </div>
      </div>
    </motion.div>
  );
}
