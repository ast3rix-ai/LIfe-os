"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, subDays, isToday, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import type { DailyCheckin } from "@/lib/types";
import { GradientSlider } from "@/components/checkin/gradient-slider";
import { NonNegotiableCircles } from "@/components/checkin/non-negotiable-circles";
import { NumberStepper } from "@/components/checkin/number-stepper";
import { ToggleSwitch } from "@/components/checkin/toggle-switch";
import { QuickCodeDisplay } from "@/components/checkin/quick-code-display";
import { CheckinSparkline } from "@/components/checkin/checkin-sparkline";
import { SaveButton } from "@/components/checkin/save-button";

function emptyCheckin(date: string): DailyCheckin {
  return {
    date,
    anxiety: 1,
    depression: 1,
    dpdr: 1,
    panicCount: 0,
    panicIntensity: 1,
    nonNegotiables: 0,
    gym: false,
    nicotine: 0,
    gamblingUrge: false,
    gamblingActed: false,
  };
}

export default function DailyCheckinPage() {
  const [currentDate, setCurrentDate] = useState(
    () => format(new Date(), "yyyy-MM-dd")
  );
  const [form, setForm] = useState<DailyCheckin>(() =>
    emptyCheckin(currentDate)
  );
  const [allCheckins, setAllCheckins] = useState<DailyCheckin[]>([]);

  // Load data when date changes
  useEffect(() => {
    const stored = getStorageItem("daily-checkins");
    setAllCheckins(stored);
    const existing = stored.find((c) => c.date === currentDate);
    setForm(existing ?? emptyCheckin(currentDate));
  }, [currentDate]);

  const update = useCallback(
    <K extends keyof DailyCheckin>(field: K, value: DailyCheckin[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    const stored = getStorageItem("daily-checkins");
    const idx = stored.findIndex((c) => c.date === currentDate);
    if (idx >= 0) {
      stored[idx] = form;
    } else {
      stored.push(form);
    }
    setStorageItem("daily-checkins", stored);
    setAllCheckins(stored);
  }, [form, currentDate]);

  const goBack = () =>
    setCurrentDate(format(subDays(parseISO(currentDate), 1), "yyyy-MM-dd"));
  const goForward = () => {
    const next = addDays(parseISO(currentDate), 1);
    if (next <= new Date()) {
      setCurrentDate(format(next, "yyyy-MM-dd"));
    }
  };

  const parsedDate = parseISO(currentDate);
  const isTodayDate = isToday(parsedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-5"
    >
      {/* Header with date nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-6 h-6 text-[#E94560]" />
          <h2 className="text-xl font-bold text-[#E6EDF3]">
            Daily Check-in
          </h2>
        </div>
      </div>

      {/* Date Navigation */}
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

      {/* Sliders Section */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5 space-y-5">
        <GradientSlider
          label="Anxiety"
          value={form.anxiety}
          onChange={(v) => update("anxiety", v)}
        />
        <div className="h-px bg-[#30363D]" />
        <GradientSlider
          label="Depression"
          value={form.depression}
          onChange={(v) => update("depression", v)}
        />
        <div className="h-px bg-[#30363D]" />
        <GradientSlider
          label="DPDR"
          value={form.dpdr}
          onChange={(v) => update("dpdr", v)}
        />
      </div>

      {/* Panic Attacks */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5 space-y-4">
        <NumberStepper
          label="Panic Attacks"
          value={form.panicCount}
          onChange={(v) => update("panicCount", v)}
          max={20}
        />
        <AnimatePresence>
          {form.panicCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <GradientSlider
                  label="Panic Intensity"
                  value={form.panicIntensity}
                  onChange={(v) => update("panicIntensity", v)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Non-Negotiables */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5">
        <NonNegotiableCircles
          value={form.nonNegotiables}
          onChange={(v) => update("nonNegotiables", v)}
        />
      </div>

      {/* Toggles & Stepper */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5 space-y-4">
        <ToggleSwitch
          label="Gym Today"
          value={form.gym}
          onChange={(v) => update("gym", v)}
        />
        <div className="h-px bg-[#30363D]" />
        <NumberStepper
          label="Nicotine Pouches"
          value={form.nicotine}
          onChange={(v) => update("nicotine", v)}
          max={30}
        />
        <div className="h-px bg-[#30363D]" />
        <ToggleSwitch
          label="Gambling Urge"
          value={form.gamblingUrge}
          onChange={(v) => {
            update("gamblingUrge", v);
            if (!v) update("gamblingActed", false);
          }}
        />
        <AnimatePresence>
          {form.gamblingUrge && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-1">
                <ToggleSwitch
                  label="Acted on it?"
                  value={form.gamblingActed}
                  onChange={(v) => update("gamblingActed", v)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Code */}
      <QuickCodeDisplay data={form} />

      {/* Save */}
      <SaveButton onSave={handleSave} />

      {/* Sparkline */}
      <CheckinSparkline checkins={allCheckins} />
    </motion.div>
  );
}
