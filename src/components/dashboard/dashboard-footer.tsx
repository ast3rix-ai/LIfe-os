"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Cigarette, Quote } from "lucide-react";
import type { MealLog, DailyCheckin } from "@/lib/types";

// ─── Meals Today ───
interface MealsTodayProps {
  mealLog: MealLog | null;
}

const MEAL_LABELS = ["B", "S1", "L", "S2", "D"] as const;
const MEAL_KEYS = ["breakfast", "snack1", "lunch", "snack2", "dinner"] as const;

export function MealsToday({ mealLog }: MealsTodayProps) {
  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <div className="flex items-center gap-2 mb-3">
        <UtensilsCrossed className="w-3.5 h-3.5 text-[#D29922]" />
        <p className="text-xs uppercase tracking-widest text-[#8B949E]">
          Meals Today
        </p>
      </div>
      <div className="flex items-center gap-3 justify-center">
        {MEAL_KEYS.map((key, i) => {
          const eaten = mealLog?.[key]?.eaten ?? false;
          return (
            <div key={key} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  eaten
                    ? "bg-[#3FB950] border-[#3FB950]"
                    : "border-[#30363D]"
                }`}
              >
                {eaten && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white text-[10px] font-bold"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
              <span className="text-[9px] text-[#8B949E]">
                {MEAL_LABELS[i]}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-[#8B949E] mt-2">
        {mealLog ? `${mealLog.totalMeals}/5 eaten` : "Not logged yet"}
      </p>
    </div>
  );
}

// ─── Nicotine Today ───
interface NicotineTodayProps {
  todayCheckin: DailyCheckin | null;
  weekAvg: number;
}

export function NicotineToday({ todayCheckin, weekAvg }: NicotineTodayProps) {
  const count = todayCheckin?.nicotine ?? null;
  const diff = count !== null ? count - weekAvg : null;

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Cigarette className="w-3.5 h-3.5 text-[#8B949E]" />
        <p className="text-xs uppercase tracking-widest text-[#8B949E]">
          Nicotine
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-[#E6EDF3] tabular-nums">
          {count ?? "—"}
        </p>
        <p className="text-[10px] text-[#8B949E]">pouches today</p>
        {weekAvg > 0 && (
          <p className="text-[10px] text-[#8B949E] mt-1">
            Weekly avg: {weekAvg.toFixed(1)}
            {diff !== null && (
              <span
                className="ml-1"
                style={{ color: diff <= 0 ? "#3FB950" : "#E94560" }}
              >
                ({diff <= 0 ? "" : "+"}{diff})
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Motivational Quote ───
const QUOTES = [
  "You are not starting from zero. You are starting from experience.",
  "The plan is not the hard part. Showing up when you feel like shit is the hard part.",
  "Every day you follow the plan is a day closer to freedom.",
  "Build the kingdom.",
];

export function MotivationalQuote() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5 text-center"
    >
      <Quote className="w-5 h-5 text-[#E94560] mx-auto mb-2 opacity-50" />
      <p className="text-sm text-[#E6EDF3] italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </motion.div>
  );
}
