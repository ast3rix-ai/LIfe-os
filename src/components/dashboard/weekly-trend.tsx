"use client";

import { useMemo } from "react";
import { format, subDays, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { DailyCheckin } from "@/lib/types";

interface WeeklyTrendProps {
  checkins: DailyCheckin[];
  today: string;
}

export function WeeklyTrend({ checkins, today }: WeeklyTrendProps) {
  const data = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = format(subDays(parseISO(today), 6 - i), "yyyy-MM-dd");
      const c = checkins.find((ch) => ch.date === d);
      return {
        day: format(subDays(parseISO(today), 6 - i), "EEE"),
        anxiety: c?.anxiety ?? null,
        depression: c?.depression ?? null,
      };
    });
  }, [checkins, today]);

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        7-Day Trend
      </p>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262D" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#8B949E", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fill: "#8B949E", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={20}
          />
          <Tooltip
            contentStyle={{
              background: "#161B22",
              border: "1px solid #30363D",
              borderRadius: 8,
              fontSize: 11,
            }}
          />
          <Line
            type="monotone"
            dataKey="anxiety"
            stroke="#E94560"
            strokeWidth={2}
            dot={{ r: 3, fill: "#E94560" }}
            connectNulls
            name="Anxiety"
          />
          <Line
            type="monotone"
            dataKey="depression"
            stroke="#58A6FF"
            strokeWidth={2}
            dot={{ r: 3, fill: "#58A6FF" }}
            connectNulls
            name="Depression"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
