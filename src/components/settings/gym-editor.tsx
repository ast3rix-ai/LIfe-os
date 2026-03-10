"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Plus, Trash2 } from "lucide-react";
import type { GymTemplate, GymDay } from "@/lib/types";
import { DAY_META } from "@/lib/gym-templates";
import { getGymTemplate } from "@/lib/templates";
import { setStorageItem } from "@/lib/storage";

export function SettingsGymEditor() {
  const [template, setTemplate] = useState<GymTemplate | null>(null);
  const [activeDay, setActiveDay] = useState<GymDay>("A");

  useEffect(() => {
    setTemplate(getGymTemplate());
  }, []);

  if (!template) return null;

  const save = (updated: GymTemplate) => {
    setTemplate(updated);
    setStorageItem("gym-template", updated);
  };

  const updateExercise = (index: number, field: string, value: string | number) => {
    const updated = { ...template };
    updated[activeDay][index] = { ...updated[activeDay][index], [field]: value };
    save(updated);
  };

  const removeExercise = (index: number) => {
    const updated = { ...template };
    updated[activeDay].splice(index, 1);
    save(updated);
  };

  const addExercise = () => {
    const updated = { ...template };
    updated[activeDay].push({ name: "New Exercise", targetSets: 3, targetReps: "10-12" });
    save(updated);
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] overflow-hidden">
      <div className="p-5 border-b border-[#30363D] flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-[#3FB950]" />
        <div>
          <h3 className="text-sm font-bold text-[#E6EDF3]">Gym Program</h3>
          <p className="text-xs text-[#8B949E]">Customize your workout split</p>
        </div>
      </div>

      <div className="flex border-b border-[#30363D]">
        {Object.entries(DAY_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setActiveDay(key as GymDay)}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeDay === key
                ? "border-[#3FB950] bg-[#3FB950]/5"
                : "border-transparent text-[#8B949E] hover:text-[#E6EDF3]"
            }`}
          >
            <p className={`text-sm font-bold ${activeDay === key ? "text-[#E6EDF3]" : ""}`}>
              Day {key}
            </p>
            <p className="text-[10px] hidden sm:block">{meta.subtitle}</p>
          </button>
        ))}
      </div>

      <div className="p-5 space-y-3">
        {template[activeDay].map((ex, i) => (
          <div key={i} className="flex gap-2 items-center bg-[#0D1117] border border-[#30363D] p-2 rounded-[8px]">
            <input
              type="text"
              value={ex.name}
              onChange={(e) => updateExercise(i, "name", e.target.value)}
              className="flex-1 bg-transparent border-none text-sm text-[#E6EDF3] focus:outline-none px-2"
              placeholder="Exercise name"
            />
            <div className="w-16">
              <input
                type="number"
                value={ex.targetSets}
                onChange={(e) => updateExercise(i, "targetSets", parseInt(e.target.value) || 0)}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-[4px] px-2 py-1 text-center text-sm text-[#E6EDF3]"
                min={1}
                max={10}
              />
            </div>
            <span className="text-[#8B949E] text-xs">sets</span>
            <div className="w-20">
              <input
                type="text"
                value={ex.targetReps}
                onChange={(e) => updateExercise(i, "targetReps", e.target.value)}
                className="w-full bg-[#161B22] border border-[#30363D] rounded-[4px] px-2 py-1 text-center text-sm text-[#E6EDF3]"
                placeholder="reps"
              />
            </div>
            <button
              onClick={() => removeExercise(i)}
              className="p-2 text-[#8B949E] hover:text-[#E94560] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addExercise}
          className="w-full py-2.5 border border-dashed border-[#30363D] rounded-[8px] text-sm font-medium text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#8B949E] flex items-center justify-center gap-2 transition-colors mt-4"
        >
          <Plus className="w-4 h-4" /> Add Exercise
        </button>
      </div>
    </div>
  );
}
