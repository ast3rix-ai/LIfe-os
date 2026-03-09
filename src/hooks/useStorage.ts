"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStorageItem,
  setStorageItem,
  subscribeToStorage,
} from "@/lib/storage";
import type { StorageDataMap, StorageKey } from "@/lib/types";

export function useStorage<K extends StorageKey>(
  key: K
): [StorageDataMap[K], (value: StorageDataMap[K]) => void] {
  const [data, setData] = useState<StorageDataMap[K]>(
    () => [] as unknown as StorageDataMap[K]
  );

  // Load from localStorage once mounted
  useEffect(() => {
    setData(getStorageItem(key));
  }, [key]);

  // Subscribe to changes from other components
  useEffect(() => {
    const unsubscribe = subscribeToStorage((changedKey) => {
      if (changedKey === key) {
        setData(getStorageItem(key));
      }
    });
    return unsubscribe;
  }, [key]);

  const setValue = useCallback(
    (value: StorageDataMap[K]) => {
      setData(value);
      setStorageItem(key, value);
    },
    [key]
  );

  return [data, setValue];
}
