"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Calendar } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  text: string;
}

export function AppointmentsList() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [adding, setAdding] = useState(false);
  const [time, setTime] = useState("");
  const [text, setText] = useState("");

  const addItem = useCallback(() => {
    if (!time || !text) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), time, text },
    ]);
    setTime("");
    setText("");
    setAdding(false);
  }, [time, text]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-[12px] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#D29922]" />
          <p className="text-xs uppercase tracking-widest text-[#8B949E]">
            Today&apos;s Appointments
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="w-7 h-7 rounded-full bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#30363D] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 mb-3"
          >
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-[#0D1117] border border-[#30363D] rounded-[8px] px-2.5 py-1.5 text-xs text-[#E6EDF3] focus:border-[#D29922] focus:outline-none [color-scheme:dark]"
            />
            <input
              type="text"
              placeholder="Description..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              className="flex-1 bg-[#0D1117] border border-[#30363D] rounded-[8px] px-2.5 py-1.5 text-xs text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#D29922] focus:outline-none"
            />
            <button
              onClick={addItem}
              className="px-3 py-1.5 bg-[#D29922] text-white text-xs font-medium rounded-[8px] hover:bg-[#E0A82E] transition-colors"
            >
              Add
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {items.length === 0 && !adding && (
        <p className="text-xs text-[#30363D] text-center py-2">
          No appointments today
        </p>
      )}

      <div className="space-y-1.5">
        <AnimatePresence>
          {items
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="flex items-center gap-2.5 bg-[#D2992210] border border-[#D2992220] rounded-[8px] px-3 py-2"
              >
                <span className="text-xs font-medium text-[#D29922] tabular-nums">
                  {item.time}
                </span>
                <span className="text-xs text-[#E6EDF3] flex-1">
                  {item.text}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#8B949E] hover:text-[#E94560] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
