"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  format,
  parseISO,
  startOfWeek,
  eachWeekOfInterval,
  isWithinInterval,
  addDays,
} from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface PanicBarChartProps {
  checkins: DailyCheckin[];
}

export function PanicBarChart({ checkins }: PanicBarChartProps) {
  const data = useMemo(() => {
    if (checkins.length === 0) return [];
    const sorted = [...checkins].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const start = parseISO(sorted[0].date);
    const end = parseISO(sorted[sorted.length - 1].date);
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

    return weeks.map((weekStart) => {
      const weekEnd = addDays(weekStart, 6);
      const inWeek = checkins.filter((c) =>
        isWithinInterval(parseISO(c.date), { start: weekStart, end: weekEnd })
      );
      const totalPanic = inWeek.reduce((s, c) => s + c.panicCount, 0);
      return {
        week: format(weekStart, "MMM d"),
        attacks: totalPanic,
      };
    });
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
      <p className="text-xs uppercase tracking-widest text-[#8B949E] mb-3">
        Panic Attacks per Week
      </p>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30363D"
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "#8B949E", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
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
            <Bar
              dataKey="attacks"
              fill="#D29922"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              name="Panic Attacks"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
