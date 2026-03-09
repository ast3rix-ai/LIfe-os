"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardCheck,
  Pill,
  UtensilsCrossed,
  Dumbbell,
  LineChart,
  StickyNote,
  CalendarCheck,
  Calendar,
  Settings,
  Menu,
  X,
  Heart,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Daily Check-in", href: "/daily-checkin", icon: ClipboardCheck },
  { label: "Supplements", href: "/supplements", icon: Pill },
  { label: "Meals", href: "/meals", icon: UtensilsCrossed },
  { label: "Gym Log", href: "/gym", icon: Dumbbell },
  { label: "Mood Graph", href: "/mood", icon: LineChart },
  { label: "Notes", href: "/notes", icon: StickyNote },
  { label: "Weekly Review", href: "/review", icon: CalendarCheck },
  { label: "Schedule", href: "/schedule", icon: Calendar },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[#0D1117] border-b border-[#30363D]">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#E94560]" fill="#E94560" />
          <span className="text-sm font-semibold text-[#E6EDF3]">
            Life OS
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-[#161B22] transition-colors"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-[#E6EDF3]" />
          ) : (
            <Menu className="w-5 h-5 text-[#E6EDF3]" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-14 left-0 bottom-0 z-50 w-[260px] bg-[#0D1117] border-r border-[#30363D] overflow-y-auto"
            >
              <div className="p-3 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#E94560]/10 text-[#E94560]"
                          : "text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#161B22]"
                      }`}
                    >
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 w-[240px] flex-col bg-[#0D1117] border-r border-[#30363D]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[#30363D]">
          <Heart className="w-6 h-6 text-[#E94560]" fill="#E94560" />
          <span className="text-base font-bold text-[#E6EDF3] tracking-tight">
            Life OS
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[#E94560]/10 text-[#E94560]"
                    : "text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#161B22]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-[12px] bg-[#E94560]/10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] shrink-0 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[#30363D]">
          <p className="text-[11px] text-[#8B949E] text-center">
            Life OS v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
