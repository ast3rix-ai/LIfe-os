"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { GymExercise, GymSet } from "@/lib/types";
import { RestTimer } from "./rest-timer";

interface ExerciseCardProps {
  exercise: GymExercise;
  previousSets: GymSet[] | null;
  index: number;
  onSetChange: (setIdx: number, field: "weight" | "reps", value: number) => void;
}

function shouldIncreaseWeight(exercise: GymExercise): boolean {
  const topRep = parseInt(exercise.targetReps.split("-").pop() || "0", 10);
  if (topRep === 0 || exercise.sets.length < exercise.targetSets) return false;
  return exercise.sets.every((s) => s.reps >= topRep && s.weight > 0);
}

export function ExerciseCard({
  exercise,
  previousSets,
  index,
  onSetChange,
}: ExerciseCardProps) {
  const showBadge = shouldIncreaseWeight(exercise);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#E6EDF3]">
            {exercise.name}
          </p>
          {showBadge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-[10px] font-bold text-[#3FB950] bg-[#3FB95015] px-2 py-0.5 rounded-full"
            >
              <TrendingUp className="w-3 h-3" />
              INCREASE WEIGHT
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8B949E]">
            {exercise.targetSets}×{exercise.targetReps}
          </span>
          <RestTimer />
        </div>
      </div>

      {/* Set rows */}
      <div className="space-y-2">
        {/* Header row */}
        <div className="grid grid-cols-[32px_1fr_1fr] gap-2 text-[10px] text-[#8B949E] uppercase tracking-widest px-1">
          <span>Set</span>
          <span>Weight (kg)</span>
          <span>Reps</span>
        </div>
        {exercise.sets.map((set, si) => {
          const prev = previousSets?.[si];
          return (
            <div
              key={si}
              className="grid grid-cols-[32px_1fr_1fr] gap-2 items-center"
            >
              <span className="text-xs text-[#8B949E] font-medium text-center">
                {si + 1}
              </span>
              <input
                type="number"
                value={set.weight || ""}
                placeholder={prev ? String(prev.weight) : "0"}
                onChange={(e) =>
                  onSetChange(si, "weight", Number(e.target.value) || 0)
                }
                className="bg-[#0D1117] border border-[#30363D] rounded-[8px] px-3 py-2 text-sm text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#E94560] focus:outline-none transition-colors tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <input
                type="number"
                value={set.reps || ""}
                placeholder={prev ? String(prev.reps) : "0"}
                onChange={(e) =>
                  onSetChange(si, "reps", Number(e.target.value) || 0)
                }
                className="bg-[#0D1117] border border-[#30363D] rounded-[8px] px-3 py-2 text-sm text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#E94560] focus:outline-none transition-colors tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
