"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Search, Plus, Pin, FileText } from "lucide-react";
import type { Note } from "@/lib/types";

interface NotesListProps {
  notes: Note[];
  selectedId: string | null;
  search: string;
  onSearchChange: (s: string) => void;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function NotesList({
  notes,
  selectedId,
  search,
  onSearchChange,
  onSelect,
  onNew,
}: NotesListProps) {
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        )
      : notes;
    return [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [notes, search]);

  return (
    <div className="flex flex-col h-full">
      {/* Search + New */}
      <div className="space-y-2 mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B949E]" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#0D1117] border border-[#30363D] rounded-[8px] pl-9 pr-3 py-2 text-xs text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#E94560] focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-[#E94560] hover:bg-[#F04D6B] text-white text-xs font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Note
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-1 -mx-1 px-1">
        <AnimatePresence>
          {filtered.map((note) => {
            const isActive = note.id === selectedId;
            return (
              <motion.button
                key={note.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => onSelect(note.id)}
                className={`w-full text-left rounded-[10px] p-3 transition-colors ${
                  isActive
                    ? "bg-[#21262D] border border-[#E9456030]"
                    : "hover:bg-[#161B2280] border border-transparent"
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#8B949E] mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {note.pinned && (
                        <Pin className="w-3 h-3 text-[#D29922] shrink-0" />
                      )}
                      <p
                        className={`text-xs font-semibold truncate ${
                          isActive ? "text-[#E6EDF3]" : "text-[#E6EDF3]"
                        }`}
                      >
                        {note.title || "Untitled"}
                      </p>
                    </div>
                    <p className="text-[10px] text-[#8B949E] mt-0.5 truncate">
                      {note.content.slice(0, 60) || "Empty note"}
                    </p>
                    <p className="text-[9px] text-[#30363D] mt-1">
                      {format(parseISO(note.updatedAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
