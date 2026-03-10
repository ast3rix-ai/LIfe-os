"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Eye, Edit3, Pin, PinOff, Trash2 } from "lucide-react";
import type { Note } from "@/lib/types";

interface NoteEditorProps {
  note: Note;
  onChange: (note: Note) => void;
  onPin: () => void;
  onDelete: () => void;
}

export function NoteEditor({ note, onChange, onPin, onDelete }: NoteEditorProps) {
  const [preview, setPreview] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const renderMarkdown = (md: string) => {
    return md
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-[#E6EDF3] mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-[#E6EDF3] mt-5 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-[#E6EDF3] mt-5 mb-3">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#E6EDF3] font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm text-[#E6EDF3] mb-1">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm text-[#E6EDF3] mb-1">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPreview(false)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-colors ${
              !preview
                ? "bg-[#21262D] text-[#E6EDF3]"
                : "text-[#8B949E] hover:text-[#E6EDF3]"
            }`}
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => setPreview(true)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-colors ${
              preview
                ? "bg-[#21262D] text-[#E6EDF3]"
                : "text-[#8B949E] hover:text-[#E6EDF3]"
            }`}
          >
            <Eye className="w-3 h-3" /> Preview
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-[#30363D] mr-2">
            Modified {format(parseISO(note.updatedAt), "MMM d, h:mm a")}
          </span>
          <button
            onClick={onPin}
            className={`w-7 h-7 rounded-[6px] flex items-center justify-center transition-colors ${
              note.pinned
                ? "bg-[#D2992215] text-[#D29922]"
                : "text-[#8B949E] hover:text-[#D29922] hover:bg-[#D2992210]"
            }`}
            title={note.pinned ? "Unpin" : "Pin"}
          >
            {note.pinned ? (
              <PinOff className="w-3.5 h-3.5" />
            ) : (
              <Pin className="w-3.5 h-3.5" />
            )}
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onDelete}
                className="px-2 py-1 text-[10px] font-medium bg-[#E94560] text-white rounded-[6px]"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-1 text-[10px] text-[#8B949E] hover:text-[#E6EDF3]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[#8B949E] hover:text-[#E94560] hover:bg-[#E9456010] transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={note.title}
        onChange={(e) =>
          onChange({ ...note, title: e.target.value, updatedAt: new Date().toISOString() })
        }
        placeholder="Untitled note"
        className="bg-transparent text-lg font-bold text-[#E6EDF3] placeholder:text-[#30363D] border-none outline-none mb-3"
      />

      {/* Editor / Preview */}
      {preview ? (
        <div
          className="flex-1 overflow-y-auto prose prose-invert max-w-none text-sm text-[#E6EDF3] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
        />
      ) : (
        <textarea
          value={note.content}
          onChange={(e) =>
            onChange({
              ...note,
              content: e.target.value,
              updatedAt: new Date().toISOString(),
            })
          }
          placeholder="Start writing in markdown..."
          className="flex-1 bg-[#0D1117] border border-[#30363D] rounded-[10px] p-4 text-sm text-[#E6EDF3] placeholder:text-[#30363D] focus:border-[#30363D] focus:outline-none resize-none font-mono leading-relaxed"
        />
      )}
    </motion.div>
  );
}
