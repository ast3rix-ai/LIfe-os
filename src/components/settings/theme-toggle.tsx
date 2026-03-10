"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

export function SettingsThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const t = getStorageItem("theme");
    if (t === "light" || t === "dark") {
      setTheme(t);
      if (t === "light") document.documentElement.classList.add("light");
      else document.documentElement.classList.remove("light");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStorageItem("theme", next);
    if (next === "light") document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#E6EDF3]">Appearance</h3>
          <p className="text-xs text-[#8B949E] mt-1">
            Toggle between dark and light mode
          </p>
        </div>
        <button
          onClick={toggle}
          className="flex items-center gap-2 bg-[#21262D] border border-[#30363D] px-3 py-2 rounded-[8px] hover:bg-[#30363D] transition-colors"
        >
          {theme === "dark" ? (
            <>
              <Moon className="w-4 h-4 text-[#8B949E]" />
              <span className="text-xs font-medium text-[#E6EDF3]">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-[#D29922]" />
              <span className="text-xs font-medium text-[#E6EDF3]">Light</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
