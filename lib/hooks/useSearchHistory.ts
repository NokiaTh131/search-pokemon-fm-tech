import { useState, useEffect, useCallback } from "react";

const HISTORY_KEY = "search-history";
const MAX_HISTORY = 5;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse search history:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addToHistory = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      // remove duplicates
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      );

      const newHistory = [trimmed, ...filtered].slice(0, MAX_HISTORY);

      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error("Failed to save search history:", error);
      }

      return newHistory;
    });
  }, []);

  return { history, addToHistory, isLoaded };
}
