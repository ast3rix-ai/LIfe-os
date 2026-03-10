"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, subDays, isToday, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pill } from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import type { SupplementLog, SupplementItem, SupplementTimeBlock } from "@/lib/types";
import { TimeBlockCard } from "@/components/supplements/time-block-card";
import { SupplementProgress } from "@/components/supplements/supplement-progress";
import { WeeklyHeatmap } from "@/components/supplements/weekly-heatmap";

// ──── Default supplement schedule ────
const DEFAULT_SUPPLEMENTS: { name: string; timeBlock: SupplementTimeBlock }[] = [
  { name: "Vitamin D3 5000IU + K2", timeBlock: "morning" },
  { name: "Omega-3 (dose 1)", timeBlock: "morning" },
  { name: "NAC 1200mg", timeBlock: "morning" },
  { name: "L-Theanine 200mg", timeBlock: "morning" },
  { name: "Creatine 5g", timeBlock: "morning" },
  { name: "Lion's Mane 500mg", timeBlock: "morning" },
  { name: "Omega-3 (dose 2)", timeBlock: "lunch" },
  { name: "Lion's Mane 500mg", timeBlock: "lunch" },
  { name: "Zinc 25mg", timeBlock: "evening" },
  { name: "Elicea 2.5mg", timeBlock: "evening" },
  { name: "NAC 1200mg", timeBlock: "evening" },
  { name: "Melatonin 0.5mg", timeBlock: "bedtime" },
  { name: "Magnesium 400mg", timeBlock: "bedtime" },
  { name: "Glycine 3g", timeBlock: "bedtime" },
];

const TIME_BLOCKS: {
  key: SupplementTimeBlock;
  label: string;
  time: string;
}[] = [
  { key: "morning", label: "Morning", time: "8:00 AM" },
  { key: "lunch", label: "Lunch", time: "1:00 PM" },
  { key: "evening", label: "Evening", time: "7:00–8:00 PM" },
  { key: "bedtime", label: "Bedtime", time: "9:30–10:00 PM" },
];

function createEmptyLog(date: string): SupplementLog {
  return {
    date,
    items: DEFAULT_SUPPLEMENTS.map((s) => ({
      name: s.name,
      taken: false,
      timeBlock: s.timeBlock,
    })),
    completionRate: 0,
  };
}

function calcStreak(logs: SupplementLog[], today: string): number {
  let streak = 0;
  const sorted = [...logs]
    .filter((l) => l.completionRate === 100)
    .map((l) => l.date)
    .sort()
    .reverse();
  let checkDate = today;
  for (const d of sorted) {
    if (d === checkDate) {
      streak++;
      checkDate = format(subDays(parseISO(checkDate), 1), "yyyy-MM-dd");
    } else if (d < checkDate) {
      break;
    }
  }
  return streak;
}

export default function SupplementsPage() {
  const [currentDate, setCurrentDate] = useState(
    () => format(new Date(), "yyyy-MM-dd")
  );
  const [log, setLog] = useState<SupplementLog>(() =>
    createEmptyLog(currentDate)
  );
  const [allLogs, setAllLogs] = useState<SupplementLog[]>([]);

  useEffect(() => {
    const stored = getStorageItem("supplements");
    setAllLogs(stored);
    const existing = stored.find((l) => l.date === currentDate);
    setLog(existing ?? createEmptyLog(currentDate));
  }, [currentDate]);

  const save = useCallback(
    (updated: SupplementLog) => {
      const stored = getStorageItem("supplements");
      const idx = stored.findIndex((l) => l.date === currentDate);
      if (idx >= 0) stored[idx] = updated;
      else stored.push(updated);
      setStorageItem("supplements", stored);
      setAllLogs(stored);
    },
    [currentDate]
  );

  const handleToggle = useCallback(
    (name: string, timeBlock: SupplementTimeBlock, checked: boolean) => {
      setLog((prev) => {
        const items = prev.items.map((item) =>
          item.name === name && item.timeBlock === timeBlock
            ? { ...item, taken: checked }
            : item
        );
        const taken = items.filter((i) => i.taken).length;
        const rate = Math.round((taken / items.length) * 100);
        const updated = { ...prev, items, completionRate: rate };
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
    if (next <= new Date())
      setCurrentDate(format(next, "yyyy-MM-dd"));
  };

  const parsedDate = parseISO(currentDate);
  const isTodayDate = isToday(parsedDate);
  const takenCount = log.items.filter((i) => i.taken).length;
  const streak = calcStreak(allLogs, currentDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Pill className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Supplements</h2>
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

      {/* Progress */}
      <SupplementProgress
        taken={takenCount}
        total={log.items.length}
        streak={streak}
      />

      {/* Time Block Cards */}
      {TIME_BLOCKS.map((block, i) => (
        <TimeBlockCard
          key={block.key}
          timeBlock={block.key}
          label={block.label}
          time={block.time}
          items={log.items.filter((item) => item.timeBlock === block.key)}
          onToggle={(name, checked) =>
            handleToggle(name, block.key, checked)
          }
          index={i}
        />
      ))}

      {/* Weekly Heatmap */}
      <WeeklyHeatmap logs={allLogs} currentDate={currentDate} />
    </motion.div>
  );
}
