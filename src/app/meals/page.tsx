"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, subDays, isToday, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Sun,
  Cookie,
  Soup,
  Apple,
  Moon,
} from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import type { MealLog, MealKey, MealEntry } from "@/lib/types";
import { MealCard } from "@/components/meals/meal-card";
import { CalorieIndicator } from "@/components/meals/calorie-indicator";
import { MealWeeklyView } from "@/components/meals/meal-weekly-view";

const MEALS: { key: MealKey; label: string; time: string; icon: React.ReactNode }[] = [
  { key: "breakfast", label: "Breakfast", time: "8:00 AM", icon: <Sun className="w-5 h-5" /> },
  { key: "snack1", label: "Snack 1", time: "10:30 AM", icon: <Apple className="w-5 h-5" /> },
  { key: "lunch", label: "Lunch", time: "1:00 PM", icon: <Soup className="w-5 h-5" /> },
  { key: "snack2", label: "Snack 2", time: "4:00 PM", icon: <Cookie className="w-5 h-5" /> },
  { key: "dinner", label: "Dinner", time: "7:00 PM", icon: <Moon className="w-5 h-5" /> },
];

const emptyEntry = (): MealEntry => ({ eaten: false, note: "" });

function emptyMealLog(date: string): MealLog {
  return {
    date,
    breakfast: emptyEntry(),
    snack1: emptyEntry(),
    lunch: emptyEntry(),
    snack2: emptyEntry(),
    dinner: emptyEntry(),
    totalMeals: 0,
  };
}

function countMeals(log: MealLog): number {
  return (["breakfast", "snack1", "lunch", "snack2", "dinner"] as MealKey[]).filter(
    (k) => log[k].eaten
  ).length;
}

export default function MealsPage() {
  const [currentDate, setCurrentDate] = useState(
    () => format(new Date(), "yyyy-MM-dd")
  );
  const [log, setLog] = useState<MealLog>(() => emptyMealLog(currentDate));
  const [allLogs, setAllLogs] = useState<MealLog[]>([]);

  useEffect(() => {
    const stored = getStorageItem("meal-logs");
    setAllLogs(stored);
    const existing = stored.find((l) => l.date === currentDate);
    setLog(existing ?? emptyMealLog(currentDate));
  }, [currentDate]);

  const save = useCallback(
    (updated: MealLog) => {
      const stored = getStorageItem("meal-logs");
      const idx = stored.findIndex((l) => l.date === currentDate);
      if (idx >= 0) stored[idx] = updated;
      else stored.push(updated);
      setStorageItem("meal-logs", stored);
      setAllLogs(stored);
    },
    [currentDate]
  );

  const handleToggle = useCallback(
    (key: MealKey) => {
      setLog((prev) => {
        const entry = prev[key];
        const updated: MealLog = {
          ...prev,
          [key]: { ...entry, eaten: !entry.eaten },
        };
        updated.totalMeals = countMeals(updated);
        save(updated);
        return updated;
      });
    },
    [save]
  );

  const handleNote = useCallback(
    (key: MealKey, note: string) => {
      setLog((prev) => {
        const updated: MealLog = {
          ...prev,
          [key]: { ...prev[key], note },
        };
        save(updated);
        return updated;
      });
    },
    [save]
  );

  const goBack = () =>
    setCurrentDate(format(subDays(parseISO(currentDate), 1), "yyyy-MM-dd"));
  const goForward = () => {
    const next = addDays(parseISO(currentDate), 1);
    if (next <= new Date()) setCurrentDate(format(next, "yyyy-MM-dd"));
  };

  const parsedDate = parseISO(currentDate);
  const isTodayDate = isToday(parsedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <UtensilsCrossed className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Meals</h2>
      </div>

      {/* Date Nav */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 flex items-center justify-between">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#30363D] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentDate}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-lg font-bold text-[#E6EDF3]"
            >
              {format(parsedDate, "EEEE, MMMM d")}
            </motion.p>
          </AnimatePresence>
          {isTodayDate && (
            <span className="text-xs text-[#E94560] font-medium">Today</span>
          )}
        </div>
        <button
          onClick={goForward}
          disabled={isTodayDate}
          className="w-9 h-9 rounded-full bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#30363D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calorie Indicator */}
      <CalorieIndicator totalMeals={log.totalMeals} />

      {/* Meal Cards */}
      <div className="space-y-3">
        {MEALS.map((meal, i) => (
          <MealCard
            key={meal.key}
            label={meal.label}
            time={meal.time}
            entry={log[meal.key]}
            onToggle={() => handleToggle(meal.key)}
            onNoteChange={(note) => handleNote(meal.key, note)}
            index={i}
            icon={meal.icon}
          />
        ))}
      </div>

      {/* Weekly View */}
      <MealWeeklyView logs={allLogs} currentDate={currentDate} />
    </motion.div>
  );
}
