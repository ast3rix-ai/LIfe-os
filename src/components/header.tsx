"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#30363D] bg-[#0D1117]/80 backdrop-blur-md">
        <div className="h-6 w-48 bg-[#161B22] rounded animate-pulse" />
        <div className="h-5 w-32 bg-[#161B22] rounded animate-pulse" />
      </header>
    );
  }

  const now = new Date();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#30363D] bg-[#0D1117]/80 backdrop-blur-md">
      <h1 className="text-lg font-semibold text-[#E6EDF3]">
        {getGreeting()},{" "}
        <span className="text-[#E94560]">Filip</span>
      </h1>
      <time className="text-sm text-[#8B949E]">
        {format(now, "EEEE, MMMM d, yyyy")}
      </time>
    </header>
  );
}
