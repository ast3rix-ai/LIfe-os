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
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface NicotineTrendChartProps {
  checkins: DailyCheckin[];
}

export function NicotineTrendChart({ checkins }: NicotineTrendChartProps) {
  const { data, weeklyAvg } = useMemo(() => {
    if (checkins.length === 0) return { data: [], weeklyAvg: 0 };
    const sorted = [...checkins].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const last30 = sorted.slice(-30);
    const total = last30.reduce((s, c) => s + c.nicotine, 0);
    const weeklyAvg = +((total / last30.length) * 7).toFixed(1);

    return {
      data: last30.map((c) => ({
        date: format(parseISO(c.date), "MMM d"),
        pouches: c.nicotine,
      })),
      weeklyAvg: +(total / last30.length).toFixed(1),
    };
  }, [checkins]);

  if (data.length === 0) {
    return (
      <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-6 flex items-center justify-center h-[200px]">
        <p className="text-sm text-[#8B949E]">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-[#8B949E]">
          Nicotine Trend
        </p>
        <p className="text-xs text-[#8B949E]">
          Daily avg:{" "}
          <span className="text-[#D29922] font-semibold">{weeklyAvg}</span>
        </p>
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30363D"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#8B949E", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#8B949E", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={20}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0D1117",
                border: "1px solid #30363D",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#E6EDF3" }}
              labelStyle={{ color: "#8B949E" }}
            />
            <ReferenceLine
              y={weeklyAvg}
              stroke="#D29922"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
              label={{
                value: "avg",
                position: "right",
                fill: "#D29922",
                fontSize: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="pouches"
              stroke="#D29922"
              strokeWidth={2}
              dot={{ fill: "#D29922", r: 3 }}
              activeDot={{ r: 5 }}
              animationDuration={1000}
              name="Pouches"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
