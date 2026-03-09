// ──── Daily Check-in ────
export interface DailyCheckin {
  date: string; // YYYY-MM-DD
  anxiety: number; // 1-10
  depression: number; // 1-10
  dpdr: number; // 1-10
  panicCount: number; // 0-20
  panicIntensity: number; // 1-10
  nonNegotiables: number; // 0-5
  gym: boolean;
  nicotine: number; // count
  gamblingUrge: boolean;
  gamblingActed: boolean;
}

// ──── Supplements ────
export interface SupplementItem {
  name: string;
  taken: boolean;
  time: string; // HH:mm
}

export interface SupplementLog {
  date: string;
  items: SupplementItem[];
}

// ──── Meals ────
export interface MealLog {
  date: string;
  breakfast: string;
  snack1: string;
  lunch: string;
  snack2: string;
  dinner: string;
}

// ──── Gym ────
export interface GymSet {
  weight: number;
  reps: number;
}

export interface GymExercise {
  name: string;
  sets: GymSet[];
}

export type GymDay = "A" | "B" | "C" | "D";

export interface GymSession {
  date: string;
  day: GymDay;
  exercises: GymExercise[];
}

// ──── Nicotine / Habits ────
export interface NicotineLog {
  date: string;
  count: number;
  gamblingUrge: boolean;
  gamblingActed: boolean;
}

// ──── Notes ────
export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
}

// ──── Weekly Review ────
export interface WeeklyReview {
  weekStart: string; // ISO date
  answers: string[];
}

// ──── Storage Keys ────
export type StorageKey =
  | "daily-checkins"
  | "supplements"
  | "meals"
  | "gym"
  | "nicotine"
  | "notes"
  | "weekly-reviews";

// ──── Data Map ────
export interface StorageDataMap {
  "daily-checkins": DailyCheckin[];
  supplements: SupplementLog[];
  meals: MealLog[];
  gym: GymSession[];
  nicotine: NicotineLog[];
  notes: Note[];
  "weekly-reviews": WeeklyReview[];
}

// ──── Navigation ────
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
