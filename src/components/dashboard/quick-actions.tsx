"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ClipboardCheck,
  Pill,
  Dumbbell,
  Check,
  ArrowRight,
} from "lucide-react";

interface QuickActionsProps {
  checkedIn: boolean;
  supplementPct: number;
  isGymDay: boolean;
  gymLogged: boolean;
}

export function QuickActions({
  checkedIn,
  supplementPct,
  isGymDay,
  gymLogged,
}: QuickActionsProps) {
  const actions = [
    {
      href: "/daily-checkin",
      icon: checkedIn ? Check : ClipboardCheck,
      label: checkedIn ? "Logged ✓" : "Log Today",
      color: checkedIn ? "#3FB950" : "#E94560",
      badge: null,
    },
    {
      href: "/supplements",
      icon: Pill,
      label: "Supplements",
      color: "#58A6FF",
      badge: `${supplementPct}%`,
    },
    {
      href: "/gym",
      icon: Dumbbell,
      label: isGymDay
        ? gymLogged
          ? "Gym Done ✓"
          : "Gym Today"
        : "Rest Day",
      color: isGymDay ? "#3FB950" : "#8B949E",
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((a, i) => (
        <motion.div
          key={a.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.06 }}
        >
          <Link
            href={a.href}
            className="flex items-center gap-3 bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 hover:border-[#E9456040] transition-colors group"
          >
            <div
              className="w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${a.color}15` }}
            >
              <a.icon className="w-4 h-4" style={{ color: a.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#E6EDF3] truncate">
                {a.label}
              </p>
              {a.badge && (
                <span className="text-[10px] text-[#8B949E]">{a.badge}</span>
              )}
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#30363D] group-hover:text-[#8B949E] transition-colors" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
