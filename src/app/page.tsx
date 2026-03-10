"use client";

import { useState, useEffect, useMemo } from "react";
import { format, subDays, parseISO, startOfWeek, isAfter } from "date-fns";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import type { DailyCheckin, SupplementLog, MealLog, GymSession } from "@/lib/types";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StreakCards } from "@/components/dashboard/streak-cards";
import { WeeklyTrend } from "@/components/dashboard/weekly-trend";
import {
  MealsToday,
  NicotineToday,
  MotivationalQuote,
} from "@/components/dashboard/dashboard-footer";

function safeGet<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function DashboardPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [checkins, setCheckins] = useState<DailyCheckin[]>([]);
  const [supplements, setSupplements] = useState<SupplementLog[]>([]);
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [gymSessions, setGymSessions] = useState<GymSession[]>([]);

  useEffect(() => {
    setCheckins(safeGet<DailyCheckin>("daily-checkins"));
    setSupplements(safeGet<SupplementLog>("supplements"));
    setMeals(safeGet<MealLog>("meal-logs"));
    setGymSessions(safeGet<GymSession>("gym-sessions"));
  }, []);

  const todayCheckin = checkins.find((c) => c.date === today) ?? null;
  const todaySupplement = supplements.find((s) => s.date === today) ?? null;
  const todayMeal = meals.find((m) => m.date === today) ?? null;

  // ─── Gym day logic ───
  const dayOfWeek = new Date().getDay(); // 0=Sun
  const gymDays = [1, 2, 4, 5]; // Mon Tue Thu Fri
  const isGymDay = gymDays.includes(dayOfWeek);
  const gymLogged = gymSessions.some((s) => s.date === today);

  // ─── Supplement pct ───
  const supplementPct = todaySupplement
    ? Math.round(todaySupplement.completionRate)
    : 0;

  // ─── Streaks ───
  const loggingStreak = useMemo(() => {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = format(subDays(new Date(), i), "yyyy-MM-dd");
      if (checkins.some((c) => c.date === d)) streak++;
      else break;
    }
    return streak;
  }, [checkins]);

  const supplementStreak = useMemo(() => {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = format(subDays(new Date(), i), "yyyy-MM-dd");
      const s = supplements.find((sup) => sup.date === d);
      if (s && s.completionRate >= 100) streak++;
      else break;
    }
    return streak;
  }, [supplements]);

  const gymThisWeek = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    return gymSessions.filter((s) => {
      const d = parseISO(s.date);
      return isAfter(d, subDays(weekStart, 1));
    }).length;
  }, [gymSessions]);

  const daysSinceGambling = useMemo(() => {
    const acted = checkins
      .filter((c) => c.gamblingActed)
      .sort((a, b) => b.date.localeCompare(a.date));
    if (acted.length === 0) return checkins.length > 0 ? loggingStreak : 0;
    const last = parseISO(acted[0].date);
    const diff = Math.floor(
      (new Date().getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }, [checkins, loggingStreak]);

  // ─── Nicotine weekly avg ───
  const nicotineWeekAvg = useMemo(() => {
    const last7 = Array.from({ length: 7 }, (_, i) =>
      format(subDays(new Date(), i), "yyyy-MM-dd")
    );
    const vals = last7
      .map((d) => checkins.find((c) => c.date === d)?.nicotine)
      .filter((v): v is number => v !== undefined);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }, [checkins]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Dashboard</h2>
      </div>

      {/* Metric Cards */}
      <MetricCards checkins={checkins} today={today} />

      {/* Quick Actions */}
      <QuickActions
        checkedIn={!!todayCheckin}
        supplementPct={supplementPct}
        isGymDay={isGymDay}
        gymLogged={gymLogged}
      />

      {/* Streak Cards */}
      <StreakCards
        loggingStreak={loggingStreak}
        supplementStreak={supplementStreak}
        gymThisWeek={gymThisWeek}
        daysSinceGambling={daysSinceGambling}
      />

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyTrend checkins={checkins} today={today} />
        <div className="grid grid-cols-2 gap-3">
          <MealsToday mealLog={todayMeal} />
          <NicotineToday
            todayCheckin={todayCheckin}
            weekAvg={nicotineWeekAvg}
          />
        </div>
      </div>

      {/* Motivational Quote */}
      <MotivationalQuote />
    </motion.div>
  );
}
