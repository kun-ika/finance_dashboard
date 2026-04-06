import { useState, useEffect } from 'react';

/**
 * A hook to manage a slice of state in localStorage.
 * @template T
 * @param {string} key - The localStorage key.
 * @param {T} initialValue - The initial state.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The state and setter.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
