"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format, subDays, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import type { DailyCheckin } from "@/lib/types";

interface MetricCardsProps {
  checkins: DailyCheckin[];
  today: string;
}

function getSeverityColor(v: number) {
  if (v <= 3) return "#3FB950";
  if (v <= 6) return "#D29922";
  if (v <= 8) return "#DB6D28";
  return "#E94560";
}

interface MiniSparkProps {
  data: { v: number }[];
  color: string;
}

function MiniSpark({ data, color }: MiniSparkProps) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <YAxis domain={[0, 10]} hide />
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
        <Tooltip
          contentStyle={{
            background: "#161B22",
            border: "1px solid #30363D",
            borderRadius: 8,
            fontSize: 11,
          }}
          labelStyle={{ display: "none" }}
          formatter={(val: any) => [val, ""]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const METRICS = [
  { key: "anxiety" as const, label: "Anxiety" },
  { key: "depression" as const, label: "Depression" },
  { key: "dpdr" as const, label: "DPDR" },
];

export function MetricCards({ checkins, today }: MetricCardsProps) {
  const todayCheckin = checkins.find((c) => c.date === today);

  const sparkData = useMemo(() => {
    const result: Record<string, { v: number }[]> = {};
    for (const m of METRICS) {
      const pts: { v: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = format(subDays(parseISO(today), i), "yyyy-MM-dd");
        const c = checkins.find((ch) => ch.date === d);
        pts.push({ v: c ? c[m.key] : 0 });
      }
      result[m.key] = pts;
    }
    return result;
  }, [checkins, today]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {METRICS.map((m, i) => {
        const val = todayCheckin ? todayCheckin[m.key] : null;
        const color = val !== null ? getSeverityColor(val) : "#8B949E";
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8B949E]">{m.label}</span>
              <span
                className="text-xl font-bold tabular-nums"
                style={{ color }}
              >
                {val ?? "—"}
              </span>
            </div>
            <MiniSpark data={sparkData[m.key]} color={color} />
          </motion.div>
        );
      })}
    </div>
  );
}
