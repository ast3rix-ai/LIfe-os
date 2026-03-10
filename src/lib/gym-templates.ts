import type { GymDay, GymExercise } from "./types";

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

type Template = Omit<GymExercise, "sets">;

const TEMPLATES: Record<GymDay, Template[]> = {
  A: [
    { name: "Bench Press", targetSets: 3, targetReps: "8-10" },
    { name: "Overhead Press (seated)", targetSets: 3, targetReps: "8-10" },
    { name: "Incline DB Press", targetSets: 3, targetReps: "10-12" },
    { name: "Lateral Raises", targetSets: 3, targetReps: "12-15" },
    { name: "Tricep Pushdowns", targetSets: 3, targetReps: "10-12" },
    { name: "Face Pulls", targetSets: 3, targetReps: "15-20" },
  ],
  B: [
    { name: "Goblet Squat", targetSets: 3, targetReps: "10-12" },
    { name: "Romanian Deadlift DB", targetSets: 3, targetReps: "10-12" },
    { name: "Leg Press", targetSets: 3, targetReps: "10-12" },
    { name: "Leg Curl", targetSets: 3, targetReps: "10-12" },
    { name: "Calf Raises", targetSets: 3, targetReps: "15-20" },
    { name: "Plank", targetSets: 3, targetReps: "30-60s" },
  ],
  C: [
    { name: "Lat Pulldown", targetSets: 3, targetReps: "8-10" },
    { name: "Seated Cable Row", targetSets: 3, targetReps: "10-12" },
    { name: "DB Row", targetSets: 3, targetReps: "10-12" },
    { name: "Bicep Curls", targetSets: 3, targetReps: "10-12" },
    { name: "Hammer Curls", targetSets: 3, targetReps: "10-12" },
    { name: "Reverse Fly", targetSets: 3, targetReps: "12-15" },
  ],
  D: [
    { name: "Leg Press", targetSets: 3, targetReps: "10-12" },
    { name: "Walking Lunges", targetSets: 3, targetReps: "10-12" },
    { name: "Leg Extension", targetSets: 3, targetReps: "10-12" },
    { name: "Leg Curl", targetSets: 3, targetReps: "10-12" },
    { name: "Calf Raises", targetSets: 3, targetReps: "15-20" },
    { name: "Dead Bug", targetSets: 3, targetReps: "10-12" },
  ],
};

export function getTemplate(day: GymDay): GymExercise[] {
  return TEMPLATES[day].map((t) => ({
    ...t,
    sets: Array.from({ length: t.targetSets }, () => ({
      weight: 0,
      reps: 0,
    })),
  }));
}
