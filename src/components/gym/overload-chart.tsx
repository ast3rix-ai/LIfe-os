"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  Tooltip,
} from "recharts";
import type { GymSession } from "@/lib/types";

interface OverloadChartProps {
  exerciseName: string;
  sessions: GymSession[];
}

export function OverloadChart({ exerciseName, sessions }: OverloadChartProps) {
  const data = useMemo(() => {
    const relevant = sessions
      .filter((s) => s.exercises.some((e) => e.name === exerciseName))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-8);

    return relevant.map((s) => {
      const ex = s.exercises.find((e) => e.name === exerciseName)!;
      const maxWeight = Math.max(...ex.sets.map((st) => st.weight), 0);
      return { date: s.date.slice(5), weight: maxWeight };
    });
  }, [sessions, exerciseName]);

  if (data.length < 2) return null;

  return (
    <div className="h-[50px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0D1117",
              border: "1px solid #30363D",
              borderRadius: "6px",
              fontSize: "10px",
              padding: "4px 8px",
            }}
            itemStyle={{ color: "#E6EDF3" }}
            labelStyle={{ color: "#8B949E" }}
            formatter={(v: any) => [`${v} kg`, "Weight"]}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#3FB950"
            strokeWidth={2}
            dot={{ fill: "#3FB950", r: 2.5 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
