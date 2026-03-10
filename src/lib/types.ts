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
export type SupplementTimeBlock = "morning" | "lunch" | "evening" | "bedtime";

export interface SupplementItem {
  name: string;
  taken: boolean;
  timeBlock: SupplementTimeBlock;
}

export interface SupplementLog {
  date: string;
  items: SupplementItem[];
  completionRate: number;
}

// ──── Meals ────
export interface MealEntry {
  eaten: boolean;
  note?: string;
}

export type MealKey = "breakfast" | "snack1" | "lunch" | "snack2" | "dinner";

export interface MealLog {
  date: string;
  breakfast: MealEntry;
  snack1: MealEntry;
  lunch: MealEntry;
  snack2: MealEntry;
  dinner: MealEntry;
  totalMeals: number;
}

// ──── Gym ────
export interface GymSet {
  weight: number;
  reps: number;
}

export interface GymExercise {
  name: string;
  targetSets: number;
  targetReps: string; // "10-12"
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
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
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
