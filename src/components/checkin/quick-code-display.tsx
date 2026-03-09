"use client";

import { format, parseISO } from "date-fns";
import type { DailyCheckin } from "@/lib/types";

interface QuickCodeDisplayProps {
  data: DailyCheckin;
}

export function QuickCodeDisplay({ data }: QuickCodeDisplayProps) {
  const dateStr = format(parseISO(data.date), "MMM d");
  const panicStr =
    data.panicCount > 0
      ? ` PA${data.panicCount}(${data.panicIntensity})`
      : " PA0";
  const code = `${dateStr}: A${data.anxiety} D${data.depression} DP${data.dpdr}${panicStr} NNs${data.nonNegotiables} Gym:${data.gym ? "Y" : "N"} Nic:${data.nicotine} Gamble:${data.gamblingUrge ? (data.gamblingActed ? "Y-acted" : "Y") : "N"}`;

  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-[12px] p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#8B949E] mb-2">
        Quick Code
      </p>
      <code className="text-sm font-mono text-[#58A6FF] break-all leading-relaxed">
        {code}
      </code>
    </div>
  );
}
