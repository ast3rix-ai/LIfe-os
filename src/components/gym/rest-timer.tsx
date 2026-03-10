"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Pause, Play, X } from "lucide-react";

interface RestTimerProps {
  seconds?: number;
}

export function RestTimer({ seconds = 120 }: RestTimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setVisible(false);
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((p) => {
          if (p <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / seconds) * 100;

  if (!visible) {
    return (
      <button
        onClick={() => {
          setVisible(true);
          setRemaining(seconds);
          setRunning(true);
        }}
        className="flex items-center gap-1.5 text-[10px] text-[#8B949E] hover:text-[#E94560] transition-colors"
      >
        <Timer className="w-3.5 h-3.5" />
        Rest
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex items-center gap-2"
      >
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#21262D"
              strokeWidth="2.5"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={remaining === 0 ? "#3FB950" : "#E94560"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 14}
              strokeDashoffset={
                2 * Math.PI * 14 * (1 - pct / 100)
              }
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>
        <span
          className={`text-sm font-bold tabular-nums ${
            remaining === 0 ? "text-[#3FB950]" : "text-[#E6EDF3]"
          }`}
        >
          {remaining === 0
            ? "GO!"
            : `${mins}:${secs.toString().padStart(2, "0")}`}
        </span>
        <button
          onClick={() => setRunning((p) => !p)}
          className="w-6 h-6 rounded-full bg-[#21262D] flex items-center justify-center text-[#8B949E] hover:text-[#E6EDF3]"
        >
          {running ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={stop}
          className="w-6 h-6 rounded-full bg-[#21262D] flex items-center justify-center text-[#8B949E] hover:text-[#E94560]"
        >
          <X className="w-3 h-3" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
