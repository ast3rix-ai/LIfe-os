"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Pill, Dumbbell, Footprints } from "lucide-react";

type BlockColor = "work" | "health" | "social" | "rest";

interface TimelineEntry {
  time: string;
  hour: number;
  minute: number;
  activity: string;
  color: BlockColor;
  tags?: ("supplement" | "gym" | "walk")[];
}

const TIMELINE: TimelineEntry[] = [
  { time: "07:30", hour: 7, minute: 30, activity: "Wake, water, light, sighs", color: "health" },
  { time: "08:00", hour: 8, minute: 0, activity: "Breakfast + morning supplements", color: "health", tags: ["supplement"] },
  { time: "08:30", hour: 8, minute: 30, activity: "Hygiene, cold shower finish", color: "health" },
  { time: "09:00", hour: 9, minute: 0, activity: "HRV training (10min) + Deep Work Block 1", color: "work" },
  { time: "10:30", hour: 10, minute: 30, activity: "Snack 1", color: "rest" },
  { time: "11:00", hour: 11, minute: 0, activity: "Deep Work Block 2", color: "work" },
  { time: "12:00", hour: 12, minute: 0, activity: "Walk 20–30 min", color: "health", tags: ["walk"] },
  { time: "13:00", hour: 13, minute: 0, activity: "Lunch + lunch supplements", color: "health", tags: ["supplement"] },
  { time: "14:00", hour: 14, minute: 0, activity: "Work Block 3", color: "work" },
  { time: "15:00", hour: 15, minute: 0, activity: "Gym (4×/week) or walk", color: "health", tags: ["gym", "walk"] },
  { time: "17:00", hour: 17, minute: 0, activity: "Social / personal", color: "social" },
  { time: "19:00", hour: 19, minute: 0, activity: "Dinner + evening supplements", color: "health", tags: ["supplement"] },
  { time: "20:00", hour: 20, minute: 0, activity: "Elicea + NAC, wind down", color: "rest", tags: ["supplement"] },
  { time: "21:00", hour: 21, minute: 0, activity: "Journal + body scan", color: "rest" },
  { time: "21:30", hour: 21, minute: 30, activity: "Melatonin", color: "rest", tags: ["supplement"] },
  { time: "22:00", hour: 22, minute: 0, activity: "Magnesium + Glycine, phone away", color: "rest", tags: ["supplement"] },
  { time: "23:00", hour: 23, minute: 0, activity: "Sleep", color: "rest" },
];

const COLOR_MAP: Record<BlockColor, { bar: string; bg: string; text: string }> = {
  work: { bar: "#58A6FF", bg: "#58A6FF10", text: "#58A6FF" },
  health: { bar: "#3FB950", bg: "#3FB95010", text: "#3FB950" },
  social: { bar: "#BC8CFF", bg: "#BC8CFF10", text: "#BC8CFF" },
  rest: { bar: "#8B949E", bg: "#8B949E10", text: "#8B949E" },
};

const TAG_ICONS: Record<string, typeof Pill> = {
  supplement: Pill,
  gym: Dumbbell,
  walk: Footprints,
};

export function ScheduleTimeline() {
  const [nowMin, setNowMin] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    lineRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const firstMin = TIMELINE[0].hour * 60 + TIMELINE[0].minute;
  const lastMin = TIMELINE[TIMELINE.length - 1].hour * 60 + TIMELINE[TIMELINE.length - 1].minute;
  const totalRange = lastMin - firstMin;
  const nowPct = Math.max(0, Math.min(100, ((nowMin - firstMin) / totalRange) * 100));
  const showNow = nowMin >= firstMin && nowMin <= lastMin;

  return (
    <div className="relative bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 md:p-5">
      {/* Timeline */}
      <div className="relative ml-[72px] border-l-2 border-[#21262D]">
        {/* Current time line */}
        {showNow && (
          <div
            ref={lineRef}
            className="absolute left-[-1px] right-0 z-10 flex items-center"
            style={{ top: `${nowPct}%` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#E94560] -ml-[5px]" />
            <div className="flex-1 h-[2px] bg-[#E94560]" />
            <span className="text-[9px] font-bold text-[#E94560] ml-1 tabular-nums whitespace-nowrap">
              NOW
            </span>
          </div>
        )}

        {TIMELINE.map((entry, i) => {
          const c = COLOR_MAP[entry.color];
          const entryMin = entry.hour * 60 + entry.minute;
          const isPast = entryMin < nowMin;

          return (
            <motion.div
              key={entry.time}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative flex items-start py-3"
            >
              {/* Dot on line */}
              <div
                className="absolute left-[-5px] top-[18px] w-2.5 h-2.5 rounded-full border-2"
                style={{
                  borderColor: c.bar,
                  backgroundColor: isPast ? c.bar : "#0D1117",
                }}
              />
              {/* Time label — positioned to the left of the line */}
              <div className="absolute -left-[76px] top-[14px] w-[60px] text-right">
                <span
                  className={`text-xs font-medium tabular-nums ${
                    isPast ? "text-[#8B949E]" : "text-[#E6EDF3]"
                  }`}
                >
                  {entry.time}
                </span>
              </div>
              {/* Content */}
              <div
                className={`ml-5 flex-1 rounded-[10px] px-3.5 py-2.5 border transition-opacity ${
                  isPast ? "opacity-50" : ""
                }`}
                style={{
                  backgroundColor: c.bg,
                  borderColor: `${c.bar}20`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isPast ? "#8B949E" : c.text }}
                  >
                    {entry.activity}
                  </p>
                  {entry.tags && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {entry.tags.map((tag) => {
                        const Icon = TAG_ICONS[tag];
                        return (
                          <Icon
                            key={tag}
                            className="w-3.5 h-3.5"
                            style={{ color: c.bar }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
