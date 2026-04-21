import { useCallback, useEffect, useState } from 'react';

type SetValue<T> = T | ((prev: T) => T);

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readFromStorage<T>(key: string, initialValue: T): T {
  if (!isBrowser()) return initialValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : initialValue;
  } catch (err) {
    console.warn(`useLocalStorage: failed to parse key "${key}"`, err);
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readFromStorage(key, initialValue));

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        if (isBrowser()) {
          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch (err) {
            console.warn(`useLocalStorage: failed to write key "${key}"`, err);
          }
        }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    if (isBrowser()) {
      try {
        window.localStorage.removeItem(key);
      } catch (err) {
        console.warn(`useLocalStorage: failed to remove key "${key}"`, err);
      }
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Keep state in sync when another tab writes to the same key.
  useEffect(() => {
    if (!isBrowser()) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return;
      setStoredValue(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
