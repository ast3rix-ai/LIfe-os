"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { ScheduleTimeline } from "@/components/schedule/schedule-timeline";
import { MinimumViableDay } from "@/components/schedule/minimum-viable-day";
import { WeeklyGymView } from "@/components/schedule/weekly-gym-view";
import { AppointmentsList } from "@/components/schedule/appointments-list";

type Mode = "standard" | "mvd";

export default function SchedulePage() {
  const [mode, setMode] = useState<Mode>("standard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <CalendarClock className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Schedule</h2>
      </div>

      {/* Mode Toggle */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-1.5 flex gap-1">
        {(["standard", "mvd"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`relative flex-1 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
              mode === m ? "text-[#E6EDF3]" : "text-[#8B949E] hover:text-[#E6EDF3]"
            }`}
          >
            {mode === m && (
              <motion.div
                layoutId="schedule-mode"
                className="absolute inset-0 bg-[#21262D] rounded-[10px]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {m === "standard" ? "Standard Day" : "Minimum Viable Day"}
            </span>
          </button>
        ))}
      </div>

      {/* Appointments */}
      <AppointmentsList />

      {/* Content */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {mode === "standard" ? <ScheduleTimeline /> : <MinimumViableDay />}
      </motion.div>

      {/* Weekly Gym Split */}
      <WeeklyGymView />
    </motion.div>
  );
}
