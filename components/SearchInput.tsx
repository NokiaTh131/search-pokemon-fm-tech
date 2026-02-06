'use client';

import { useState, useCallback, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const LAST_SEARCH_KEY = 'pokemon-last-search';

interface SearchInputProps {
  initialValue?: string;
}

export function SearchInput({ initialValue = '' }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  // Sync input with URL on mount
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setInputValue(nameFromUrl);
    } else {
      // Try to restore from localStorage
      const lastSearch = localStorage.getItem(LAST_SEARCH_KEY);
      if (lastSearch && !initialValue) {
        setInputValue(lastSearch);
      }
    }
  }, [searchParams, initialValue]);

  const handleSubmit = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue) {
        // save last search to localstage
        localStorage.setItem(LAST_SEARCH_KEY, trimmedValue);

        startTransition(() => {
          router.push(`/search?name=${encodeURIComponent(trimmedValue)}`);
        });
      }
    },
    [inputValue, router]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <label htmlFor="pokemon-search" className="sr-only">
          Search Pokemon
        </label>
        <input
          id="pokemon-search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Pokemon name (e.g., Pikachu)"
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
          autoComplete="off"
          autoFocus
        />
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
