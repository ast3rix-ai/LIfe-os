"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical, Pill } from "lucide-react";
import type { SupplementTemplate, SupplementTimeBlock } from "@/lib/types";
import { getSupplementTemplate } from "@/lib/templates";
import { setStorageItem } from "@/lib/storage";

const BLOCKS: { key: SupplementTimeBlock; label: string }[] = [
  { key: "morning", label: "Morning" },
  { key: "lunch", label: "Lunch" },
  { key: "evening", label: "Evening" },
  { key: "bedtime", label: "Bedtime" },
];

export function SettingsSupplementEditor() {
  const [template, setTemplate] = useState<SupplementTemplate>([]);
  const [newName, setNewName] = useState("");
  const [newBlock, setNewBlock] = useState<SupplementTimeBlock>("morning");

  useEffect(() => {
    setTemplate(getSupplementTemplate());
  }, []);

  const save = (updated: SupplementTemplate) => {
    setTemplate(updated);
    setStorageItem("supplement-template", updated);
  };

  const remove = (index: number) => {
    const updated = [...template];
    updated.splice(index, 1);
    save(updated);
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    save([...template, { name: newName.trim(), timeBlock: newBlock }]);
    setNewName("");
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Pill className="w-5 h-5 text-[#58A6FF]" />
        <div>
          <h3 className="text-sm font-bold text-[#E6EDF3]">Supplement Schedule</h3>
          <p className="text-xs text-[#8B949E]">Customize your daily supplement protocol</p>
        </div>
      </div>

      <div className="space-y-6">
        {BLOCKS.map((b) => {
          const items = template
            .map((item, idx) => ({ ...item, idx }))
            .filter((i) => i.timeBlock === b.key);
            
          if (items.length === 0) return null;

          return (
            <div key={b.key}>
              <h4 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">
                {b.label}
              </h4>
              <div className="bg-[#0D1117] border border-[#30363D] rounded-[8px] divide-y divide-[#30363D]">
                {items.map((item) => (
                  <div key={item.idx} className="flex items-center justify-between p-2.5">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-[#30363D]" />
                      <span className="text-sm text-[#E6EDF3]">{item.name}</span>
                    </div>
                    <button
                      onClick={() => remove(item.idx)}
                      className="text-[#8B949E] hover:text-[#E94560] p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <form onSubmit={add} className="flex items-end gap-2 p-3 bg-[#21262D]/50 rounded-[8px] border border-[#30363D] mt-4">
          <div className="flex-1">
            <label className="block text-[10px] text-[#8B949E] uppercase mb-1">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Vitamin C 1000mg"
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-[6px] px-3 py-1.5 text-sm text-[#E6EDF3] focus:border-[#58A6FF] focus:outline-none"
            />
          </div>
          <div className="w-[120px]">
            <label className="block text-[10px] text-[#8B949E] uppercase mb-1">Time</label>
            <select
              value={newBlock}
              onChange={(e) => setNewBlock(e.target.value as SupplementTimeBlock)}
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-[6px] px-2 py-1.5 text-sm text-[#E6EDF3] focus:border-[#58A6FF] focus:outline-none"
            >
              {BLOCKS.map(b => (
                <option key={b.key} value={b.key}>{b.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={!newName.trim()}
            className="bg-[#58A6FF] text-white px-3 py-1.5 rounded-[6px] text-sm font-semibold flex items-center gap-1 hover:bg-[#4A93E8] disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      </div>
    </div>
  );
}
