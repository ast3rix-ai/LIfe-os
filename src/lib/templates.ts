import { getStorageItem, setStorageItem } from "./storage";
import type { SupplementTemplate, GymTemplate, SupplementTimeBlock, GymDay } from "./types";

export const DEFAULT_SUPPLEMENT_TEMPLATE: SupplementTemplate = [
  { name: "Vitamin D3 5000IU + K2", timeBlock: "morning" },
  { name: "Omega-3 (dose 1)", timeBlock: "morning" },
  { name: "NAC 1200mg", timeBlock: "morning" },
  { name: "L-Theanine 200mg", timeBlock: "morning" },
  { name: "Creatine 5g", timeBlock: "morning" },
  { name: "Lion's Mane 500mg", timeBlock: "morning" },
  { name: "Omega-3 (dose 2)", timeBlock: "lunch" },
  { name: "Lion's Mane 500mg", timeBlock: "lunch" },
  { name: "Zinc 25mg", timeBlock: "evening" },
  { name: "Elicea 2.5mg", timeBlock: "evening" },
  { name: "NAC 1200mg", timeBlock: "evening" },
  { name: "Melatonin 0.5mg", timeBlock: "bedtime" },
  { name: "Magnesium 400mg", timeBlock: "bedtime" },
  { name: "Glycine 3g", timeBlock: "bedtime" },
];

export const DEFAULT_GYM_TEMPLATE: GymTemplate = {
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

export function getSupplementTemplate(): SupplementTemplate {
  if (typeof window === "undefined") return DEFAULT_SUPPLEMENT_TEMPLATE;
  const stored = getStorageItem("supplement-template");
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    setStorageItem("supplement-template", DEFAULT_SUPPLEMENT_TEMPLATE);
    return DEFAULT_SUPPLEMENT_TEMPLATE;
  }
  return stored;
}

export function getGymTemplate(): GymTemplate {
  if (typeof window === "undefined") return DEFAULT_GYM_TEMPLATE;
  const stored = getStorageItem("gym-template");
  if (!stored || Object.keys(stored).length === 0) {
    setStorageItem("gym-template", DEFAULT_GYM_TEMPLATE);
    return DEFAULT_GYM_TEMPLATE;
  }
  return stored;
}
