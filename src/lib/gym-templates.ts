import type { GymDay, GymExercise } from "./types";
import { getGymTemplate } from "./templates";

interface DayMeta {
  label: string;
  subtitle: string;
  weekday: string;
}

export const DAY_META: Record<GymDay, DayMeta> = {
  A: { label: "Day A", subtitle: "Upper Push", weekday: "Mon" },
  B: { label: "Day B", subtitle: "Lower", weekday: "Tue" },
  C: { label: "Day C", subtitle: "Upper Pull", weekday: "Thu" },
  D: { label: "Day D", subtitle: "Lower + Core", weekday: "Fri" },
};

// Imported from lib/templates

export function getTemplate(day: GymDay): GymExercise[] {
  const templates = getGymTemplate();
  return templates[day].map((t) => ({
    ...t,
    sets: Array.from({ length: t.targetSets }, () => ({
      weight: 0,
      reps: 0,
    })),
  }));
}
