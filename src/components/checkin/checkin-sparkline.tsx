"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface CheckinSparklineProps {
  checkins: DailyCheckin[];
}

export function CheckinSparkline({ checkins }: CheckinSparklineProps) {
  // Get last 7 entries sorted by date
  const data = [...checkins]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .map((c) => ({
      date: format(parseISO(c.date), "MMM d"),
      Anxiety: c.anxiety,
      Depression: c.depression,
      DPDR: c.dpdr,
    }));

  if (data.length < 2) {
    return (
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-6 flex flex-col items-center justify-center h-[200px]">
        <p className="text-sm text-[#8B949E]">
          Log at least 2 days to see trends
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-xs text-[#8B949E] mb-3 uppercase tracking-widest">
        Last 7 Days
      </p>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#8B949E", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[1, 10]}
              tick={{ fill: "#8B949E", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#E6EDF3" }}
              labelStyle={{ color: "#8B949E" }}
            />
            <Line
              type="monotone"
              dataKey="Anxiety"
              stroke="#E94560"
              strokeWidth={2}
              dot={{ fill: "#E94560", r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Depression"
              stroke="#58A6FF"
              strokeWidth={2}
              dot={{ fill: "#58A6FF", r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="DPDR"
              stroke="#BC8CFF"
              strokeWidth={2}
              dot={{ fill: "#BC8CFF", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-2 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E94560]" />
          <span className="text-[10px] text-[#8B949E]">Anxiety</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#58A6FF]" />
          <span className="text-[10px] text-[#8B949E]">Depression</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#BC8CFF]" />
          <span className="text-[10px] text-[#8B949E]">DPDR</span>
        </div>
      </div>
    </div>
  );
}
