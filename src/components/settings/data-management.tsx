"use client";

import { useState, useRef } from "react";
import { Download, Upload, AlertTriangle, ShieldAlert } from "lucide-react";
import { setStorageItem, clearAllStorage } from "@/lib/storage";
import type { StorageDataMap } from "@/lib/types";

export function SettingsDataManagement() {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const keys: (keyof StorageDataMap)[] = [
      "daily-checkins",
      "supplements",
      "meals",
      "gym",
      "nicotine",
      "notes",
      "weekly-reviews",
      "supplement-template",
      "gym-template",
      "theme",
    ];
    
    const data: Record<string, unknown> = {};
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v) data[k] = JSON.parse(v);
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `life-os-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        for (const [key, value] of Object.entries(data)) {
          setStorageItem(key as keyof StorageDataMap, value as any);
        }
        alert("Data imported successfully! The page will now reload.");
        window.location.reload();
      } catch (err) {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (resetInput === "RESET") {
      clearAllStorage();
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] overflow-hidden">
      <div className="p-5 border-b border-[#30363D]">
        <h3 className="text-sm font-bold text-[#E6EDF3]">Data Management</h3>
        <p className="text-xs text-[#8B949E] mt-1">
          Export your data for safekeeping or import an existing backup.
        </p>
      </div>
      
      <div className="p-5 flex flex-col sm:flex-row gap-3 border-b border-[#30363D]">
        <button
          onClick={handleExport}
          className="flex-1 flex items-center justify-center gap-2 bg-[#21262D] border border-[#30363D] px-4 py-2.5 rounded-[8px] hover:bg-[#30363D] transition-colors"
        >
          <Download className="w-4 h-4 text-[#8B949E]" />
          <span className="text-sm font-medium text-[#E6EDF3]">Export Data</span>
        </button>
        
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 bg-[#21262D] border border-[#30363D] px-4 py-2.5 rounded-[8px] hover:bg-[#30363D] transition-colors"
        >
          <Upload className="w-4 h-4 text-[#8B949E]" />
          <span className="text-sm font-medium text-[#E6EDF3]">Import Backup</span>
        </button>
      </div>

      <div className="p-5 bg-[#E94560]/5">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#E94560] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Danger Zone
            </h4>
            <p className="text-xs text-[#8B949E] mt-1">
              Permanently delete all data stored in this browser.
            </p>
          </div>
          {!resetConfirm && (
            <button
              onClick={() => setResetConfirm(true)}
              className="bg-[#E94560]/10 text-[#E94560] px-3 py-1.5 rounded-[6px] text-xs font-semibold hover:bg-[#E94560]/20 transition-colors"
            >
              Reset Data
            </button>
          )}
        </div>

        {resetConfirm && (
          <div className="mt-4 p-4 border border-[#E94560]/40 rounded-[8px] bg-[#E94560]/10 flex flex-col gap-3">
            <p className="text-sm text-[#E6EDF3] font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E94560]" />
              This cannot be undone. Type <strong className="text-[#E94560]">RESET</strong> to confirm.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={resetInput}
                onChange={(e) => setResetInput(e.target.value)}
                placeholder="Type RESET"
                className="flex-1 bg-[#0D1117] border border-[#30363D] rounded-[6px] px-3 py-1.5 text-sm text-[#E6EDF3] focus:border-[#E94560] focus:outline-none"
              />
              <button
                onClick={handleReset}
                disabled={resetInput !== "RESET"}
                className="bg-[#E94560] text-white px-4 py-1.5 rounded-[6px] text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setResetConfirm(false);
                  setResetInput("");
                }}
                className="px-3 py-1.5 text-sm text-[#8B949E] hover:text-[#E6EDF3]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
