"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { StickyNote } from "lucide-react";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import type { Note } from "@/lib/types";
import { NotesList } from "@/components/notes/notes-list";
import { NoteEditor } from "@/components/notes/note-editor";

const DEFAULT_NOTES: Note[] = [
  {
    id: "seed-1",
    title: "PATH TWO — Independence Protocol",
    content: `## Independence Protocol Summary

**Goal:** Build a self-sufficient, independent life within 12-18 months.

### Phase 1: Foundation (Months 1-3)
- Stabilize mental health with current protocol
- Establish daily routine (Standard Day template)
- Hit all non-negotiables consistently (4-5/5 daily)
- Begin income-generating work (freelance/remote)

### Phase 2: Building (Months 4-8)
- Scale income to cover basic expenses
- Reduce reliance on external support
- Build emergency fund (3 months expenses)
- Maintain gym 4x/week, zero missed medication days

### Phase 3: Launch (Months 9-18)
- Full financial independence
- Own living situation secured
- Strong social support network
- Mental health managed proactively, not reactively

### Non-Negotiables
1. Morning routine completed by 9:00 AM
2. All medication and supplements taken
3. Gym or movement daily
4. 3+ meals eaten
5. Minimum 4 hours of income work

### Key Principle
*"Progress over perfection. A Minimum Viable Day still counts."*`,
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    pinned: true,
  },
  {
    id: "seed-2",
    title: "Psychiatric Assessment Summary",
    content: `## Key Findings

**Diagnoses:**
- Generalized Anxiety Disorder (GAD)
- Major Depressive Disorder — moderate, recurrent
- Depersonalization/Derealization Disorder (DPDR)
- Panic Disorder with sporadic attacks

**Current Medication:**
- Elicea (Escitalopram) 2.5mg — evening
- As-needed: L-Theanine for acute anxiety

**Supplement Protocol (Psychiatrist-Approved):**
- NAC 1200mg × 2 daily (anxiety/OCD reduction)
- Magnesium 400mg (sleep, muscle recovery)
- Omega-3 × 2 daily (mood support)
- Vitamin D3 5000IU + K2 (deficiency correction)
- Lion's Mane 500mg × 2 (cognitive support)
- Melatonin 0.5mg (sleep onset)
- Glycine 3g (sleep quality)
- Zinc 25mg (immune, mood)
- Creatine 5g (cognitive, gym performance)

**Key Notes:**
- DPDR episodes correlate with high anxiety days (A>7)
- Panic attacks decreased from ~3/week to ~1/week since starting protocol
- Gambling urges linked to anxiety spikes — have an action plan
- Cold shower exposure showing benefit for DPDR (emerging)
- HRV training recommended for anxiety management`,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
    pinned: true,
  },
  {
    id: "seed-3",
    title: "Weekly Review Template",
    content: `## Weekly Review Questions

1. **What improved this week?**
   - 

2. **Hardest day and trigger?**
   - 

3. **Non-negotiables hit rate?**
   - ___ / 7 days at 4+/5

4. **Gym sessions completed?**
   - ___ / 4 planned sessions

5. **Hours of income work?**
   - ___ hours (target: 20+)

6. **Social interactions?**
   - 

7. **Nicotine average?**
   - ___ pouches/day (target: decrease)

8. **Adjustments for next week?**
   - 

---
*Fill this out every Sunday evening. Be honest — this is for you.*`,
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z",
    pinned: true,
  },
];

function generateId() {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load on mount — seed defaults if empty
  useEffect(() => {
    let stored = getStorageItem("notes");
    if (stored.length === 0) {
      stored = DEFAULT_NOTES;
      setStorageItem("notes", stored);
    }
    setNotes(stored);
    setSelectedId(stored[0]?.id ?? null);
  }, []);

  const persist = useCallback((updated: Note[]) => {
    setNotes(updated);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setStorageItem("notes", updated);
    }, 300);
  }, []);

  const handleNew = useCallback(() => {
    const now = new Date().toISOString();
    const note: Note = {
      id: generateId(),
      title: "",
      content: "",
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    const updated = [note, ...notes];
    persist(updated);
    setSelectedId(note.id);
  }, [notes, persist]);

  const handleChange = useCallback(
    (note: Note) => {
      const updated = notes.map((n) => (n.id === note.id ? note : n));
      persist(updated);
    },
    [notes, persist]
  );

  const handlePin = useCallback(() => {
    if (!selectedId) return;
    const updated = notes.map((n) =>
      n.id === selectedId ? { ...n, pinned: !n.pinned } : n
    );
    persist(updated);
  }, [notes, selectedId, persist]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    const updated = notes.filter((n) => n.id !== selectedId);
    persist(updated);
    setSelectedId(updated[0]?.id ?? null);
  }, [notes, selectedId, persist]);

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  return (
    <div className="h-[calc(100vh-120px)] max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <StickyNote className="w-6 h-6 text-[#E94560]" />
        <h2 className="text-xl font-bold text-[#E6EDF3]">Notes</h2>
      </div>

      {/* Split layout */}
      <div className="flex gap-4 h-[calc(100%-52px)]">
        {/* Sidebar */}
        <div className="w-[280px] shrink-0 bg-[#161B22] border border-[#30363D] rounded-[12px] p-3">
          <NotesList
            notes={notes}
            selectedId={selectedId}
            search={search}
            onSearchChange={setSearch}
            onSelect={setSelectedId}
            onNew={handleNew}
          />
        </div>

        {/* Editor */}
        <div className="flex-1 bg-[#161B22] border border-[#30363D] rounded-[12px] p-4 min-w-0">
          {selected ? (
            <NoteEditor
              note={selected}
              onChange={handleChange}
              onPin={handlePin}
              onDelete={handleDelete}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[#30363D] text-sm">
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
