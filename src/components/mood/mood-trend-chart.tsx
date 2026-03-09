"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface MoodTrendChartProps {
  checkins: DailyCheckin[];
  days: number; // 0 = all time
}

export function MoodTrendChart({ checkins, days }: MoodTrendChartProps) {
  const data = useMemo(() => {
    const sorted = [...checkins].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const sliced = days > 0 ? sorted.slice(-days) : sorted;
    return sliced.map((c) => ({
      date: format(parseISO(c.date), "MMM d"),
      fullDate: c.date,
      Anxiety: c.anxiety,
      Depression: c.depression,
      DPDR: c.dpdr,
      panicCount: c.panicCount,
      nonNegotiables: c.nonNegotiables,
      nicotine: c.nicotine,
      gym: c.gym,
    }));
  }, [checkins, days]);

  if (data.length === 0) {
    return (
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-8 flex items-center justify-center h-[360px]">
        <p className="text-sm text-[#8B949E]">
          No check-in data yet. Start logging daily to see trends.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 md:p-5">
      <div className="h-[320px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30363D"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#8B949E", fontSize: 11 }}
              axisLine={{ stroke: "#30363D" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "#8B949E", fontSize: 11 }}
              axisLine={{ stroke: "#30363D" }}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", color: "#8B949E" }}
            />
            <Line
              type="monotone"
              dataKey="Anxiety"
              stroke="#E94560"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#E94560" }}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="Depression"
              stroke="#58A6FF"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#58A6FF" }}
              animationDuration={1200}
              animationBegin={200}
            />
            <Line
              type="monotone"
              dataKey="DPDR"
              stroke="#BC8CFF"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#BC8CFF" }}
              animationDuration={1200}
              animationBegin={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-[10px] p-3 shadow-xl text-xs space-y-1.5 min-w-[160px]">
      <p className="text-[#E6EDF3] font-semibold text-sm">{label}</p>
      <div className="flex justify-between">
        <span className="text-[#E94560]">● Anxiety</span>
        <span className="text-[#E6EDF3] font-bold">{d?.Anxiety}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#58A6FF]">● Depression</span>
        <span className="text-[#E6EDF3] font-bold">{d?.Depression}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#BC8CFF]">● DPDR</span>
        <span className="text-[#E6EDF3] font-bold">{d?.DPDR}</span>
      </div>
      {d?.panicCount > 0 && (
        <div className="flex justify-between pt-1 border-t border-[#30363D]">
          <span className="text-[#8B949E]">Panic</span>
          <span className="text-[#E6EDF3]">
            {d.panicCount}x
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-[#8B949E]">NNs</span>
        <span className="text-[#E6EDF3]">{d?.nonNegotiables}/5</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#8B949E]">Gym</span>
        <span className="text-[#E6EDF3]">{d?.gym ? "✓" : "✗"}</span>
      </div>
    </div>
  );
}
