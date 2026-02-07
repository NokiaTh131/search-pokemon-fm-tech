'use client';

import { useState, useCallback, useEffect, useTransition, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchHistory } from '@/lib/hooks/useSearchHistory';
import { SearchDropdown } from './SearchDropdown';

interface SearchInputProps {
  initialValue?: string;
}

export function SearchInput({ initialValue = '' }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { history, addToHistory } = useSearchHistory();

  const [inputValue, setInputValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLFormElement>(null);

  const filteredHistory = history.filter(item =>
    !inputValue || item.toLowerCase().includes(inputValue.toLowerCase())
  );
  const nameFromUrl = searchParams.get('name');

  // sync input with url on mount
  useEffect(() => {
    if (nameFromUrl) {
      setInputValue(prev => prev === nameFromUrl ? prev : nameFromUrl);
    }
  }, [nameFromUrl]);

  // handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = useCallback((term: string) => {
    const trimmedValue = term.trim();
    if (trimmedValue) {
      addToHistory(trimmedValue);
      setIsFocused(false);
      setSelectedIndex(-1);
      // Update input to match search term if different
      setInputValue(trimmedValue);

      startTransition(() => {
        router.push(`/search?name=${encodeURIComponent(trimmedValue)}`);
      });
    }
  }, [addToHistory, router]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < filteredHistory.length) {
      performSearch(filteredHistory[selectedIndex]);
    } else {
      performSearch(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // escape to close dropdown menu
    if (e.key === 'Escape') {
      setIsFocused(false);
      setSelectedIndex(-1);
      return;
    }

    if (!filteredHistory.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredHistory.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Enter') { // enter to submit
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredHistory.length) {
        performSearch(filteredHistory[selectedIndex]);
      } else {
        performSearch(inputValue);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1); // Reset selection when typing
    setIsFocused(true);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className="relative w-full max-w-md"
    >
      <div className="flex gap-2">
        <label htmlFor="pokemon-search" className="sr-only">
          Search Pokemon
        </label>
        <div className="relative flex-1">
          <input
            id="pokemon-search"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Pokemon name (e.g., Pikachu)"
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
            autoComplete="off"
          />

          {/* Dropdown Suggestions */}
          {isFocused && filteredHistory.length > 0 && (
            <SearchDropdown selectedIndex={selectedIndex} items={filteredHistory} onHover={setSelectedIndex} onSelect={performSearch} />

          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
          disabled={!inputValue.trim() || isPending}
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
