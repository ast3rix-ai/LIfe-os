"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import type { GymExercise } from "@/lib/types";

interface SessionSummaryProps {
  exercises: GymExercise[];
}

export function SessionSummary({ exercises }: SessionSummaryProps) {
  const { totalVolume, totalSets, totalReps } = useMemo(() => {
    let totalVolume = 0;
    let totalSets = 0;
    let totalReps = 0;
    for (const ex of exercises) {
      for (const s of ex.sets) {
        if (s.weight > 0 && s.reps > 0) {
          totalVolume += s.weight * s.reps;
          totalSets++;
          totalReps += s.reps;
        }
      }
    }
    return { totalVolume, totalSets, totalReps };
  }, [exercises]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4"
    >
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        Session Summary
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Dumbbell className="w-3.5 h-3.5 text-[#E94560]" />
          </div>
          <p className="text-lg font-bold text-[#E6EDF3] tabular-nums">
            {totalVolume.toLocaleString()}
          </p>
          <p className="text-[10px] text-[#8B949E]">Total Volume (kg)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#E6EDF3] tabular-nums mt-5">
            {totalSets}
          </p>
          <p className="text-[10px] text-[#8B949E]">Sets Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#E6EDF3] tabular-nums mt-5">
            {totalReps}
          </p>
          <p className="text-[10px] text-[#8B949E]">Total Reps</p>
        </div>
      </div>
    </motion.div>
  );
}
