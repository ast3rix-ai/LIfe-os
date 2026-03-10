"use client";

import type { StorageDataMap, StorageKey } from "./types";

// ──── Core Storage Functions ────

export function getStorageItem<K extends keyof StorageDataMap>(
  key: K
): StorageDataMap[K] {
  if (typeof window === "undefined") {
    return [] as unknown as StorageDataMap[K];
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [] as unknown as StorageDataMap[K];
    return JSON.parse(raw) as StorageDataMap[K];
  } catch {
    return [] as unknown as StorageDataMap[K];
  }
}

export function setStorageItem<K extends keyof StorageDataMap>(
  key: K,
  value: StorageDataMap[K]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event so subscribers are notified
    window.dispatchEvent(
      new CustomEvent("life-os-storage", { detail: { key } })
    );
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
}

// ──── Subscribe to Changes ────

type StorageListener = (key: StorageKey) => void;

export function subscribeToStorage(listener: StorageListener): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ key: StorageKey }>;
    listener(customEvent.detail.key);
  };

  window.addEventListener("life-os-storage", handler);
  return () => window.removeEventListener("life-os-storage", handler);
}

// ──── Convenience Helpers ────

export function removeStorageItem(key: StorageKey): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
  window.dispatchEvent(
    new CustomEvent("life-os-storage", { detail: { key } })
  );
}

export function clearAllStorage(): void {
  if (typeof window === "undefined") return;
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
  keys.forEach((key) => localStorage.removeItem(key));
}
