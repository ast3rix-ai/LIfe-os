"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Dumbbell, Save } from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import type { GymDay, GymSession } from "@/lib/types";
import { getTemplate } from "@/lib/gym-templates";
import { DaySelector } from "@/components/gym/day-selector";
import { ExerciseCard } from "@/components/gym/exercise-card";
import { SessionSummary } from "@/components/gym/session-summary";
import { OverloadChart } from "@/components/gym/overload-chart";

export default function GymLogPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDay, setSelectedDay] = useState<GymDay>("A");
  const [session, setSession] = useState<GymSession>({
    date: today,
    day: "A",
    exercises: getTemplate("A"),
  });
  const [allSessions, setAllSessions] = useState<GymSession[]>([]);
  const [saved, setSaved] = useState(false);

  // Load sessions on mount
  useEffect(() => {
    const stored = getStorageItem("gym-sessions");
    setAllSessions(stored);
    // Check if there's already a session for today with this day
    const existing = stored.find(
      (s) => s.date === today && s.day === selectedDay
    );
    if (existing) {
      setSession(existing);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When day changes, load template or existing session
  const handleDayChange = useCallback(
    (day: GymDay) => {
      setSelectedDay(day);
      setSaved(false);
      const existing = allSessions.find(
        (s) => s.date === today && s.day === day
      );
      setSession(
        existing ?? { date: today, day, exercises: getTemplate(day) }
      );
    },
    [allSessions, today]
  );

  const handleSetChange = useCallback(
    (exIdx: number, setIdx: number, field: "weight" | "reps", value: number) => {
      setSession((prev) => {
        const exercises = prev.exercises.map((ex, ei) => {
          if (ei !== exIdx) return ex;
          const sets = ex.sets.map((s, si) =>
            si === setIdx ? { ...s, [field]: value } : s
          );
          return { ...ex, sets };
        });
        return { ...prev, exercises };
      });
    },
    []
  );

  // Find previous session for ghost text
  const getPreviousSets = useCallback(
    (exerciseName: string) => {
      const previous = [...allSessions]
        .filter((s) => s.day === selectedDay && s.date !== today)
        .sort((a, b) => b.date.localeCompare(a.date));
      if (previous.length === 0) return null;
      const ex = previous[0].exercises.find((e) => e.name === exerciseName);
      return ex?.sets ?? null;
    },
    [allSessions, selectedDay, today]
  );

  const handleSave = useCallback(() => {
    const stored = getStorageItem("gym-sessions");
    const idx = stored.findIndex(
      (s) => s.date === today && s.day === selectedDay
    );
    if (idx >= 0) stored[idx] = session;
    else stored.push(session);
    setStorageItem("gym-sessions", stored);
    setAllSessions(stored);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [session, today, selectedDay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-6 h-6 text-[#E94560]" />
          <h2 className="text-xl font-bold text-[#E6EDF3]">Gym Log</h2>
        </div>
        <p className="text-sm text-[#8B949E]">
          {format(new Date(), "EEEE, MMMM d")}
        </p>
      </div>

      {/* Day Selector */}
      <DaySelector selected={selectedDay} onChange={handleDayChange} />

      {/* Exercises */}
      {session.exercises.map((ex, i) => (
        <div key={ex.name}>
          <ExerciseCard
            exercise={ex}
            previousSets={getPreviousSets(ex.name)}
            index={i}
            onSetChange={(setIdx, field, value) =>
              handleSetChange(i, setIdx, field, value)
            }
          />
          <OverloadChart
            exerciseName={ex.name}
            sessions={allSessions}
          />
        </div>
      ))}

      {/* Session Summary */}
      <SessionSummary exercises={session.exercises} />

      {/* Save */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        className={`w-full py-3.5 rounded-[12px] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          saved
            ? "bg-[#3FB950] text-white"
            : "bg-[#E94560] hover:bg-[#F04D6B] text-white"
        }`}
      >
        <Save className="w-4 h-4" />
        {saved ? "Saved ✓" : "Save Session"}
      </motion.button>
    </motion.div>
  );
}
