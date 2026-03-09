"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Pill,
  Dumbbell,
  UtensilsCrossed,
  TrendingUp,
} from "lucide-react";

const quickStats = [
  { label: "Check-in Streak", value: "—", icon: Activity, color: "#E94560" },
  { label: "Supplements Today", value: "—", icon: Pill, color: "#58A6FF" },
  { label: "Gym Sessions", value: "—", icon: Dumbbell, color: "#3FB950" },
  { label: "Meals Logged", value: "—", icon: UtensilsCrossed, color: "#D29922" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Dashboard</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5 flex items-center gap-4 hover:border-[#E94560]/30 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon
                className="w-5 h-5"
                style={{ color: stat.color }}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stat.value}</p>
              <p className="text-xs text-[#8B949E]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Placeholder sections */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <motion.div
          variants={item}
          className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-6 min-h-[240px] flex flex-col items-center justify-center"
        >
          <TrendingUp className="w-8 h-8 text-[#8B949E] mb-3" />
          <p className="text-sm text-[#8B949E]">Mood Trends</p>
          <p className="text-xs text-[#8B949E]/60 mt-1">
            Start logging to see your trends
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-6 min-h-[240px] flex flex-col items-center justify-center"
        >
          <Activity className="w-8 h-8 text-[#8B949E] mb-3" />
          <p className="text-sm text-[#8B949E]">Weekly Overview</p>
          <p className="text-xs text-[#8B949E]/60 mt-1">
            Complete your first week of check-ins
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
