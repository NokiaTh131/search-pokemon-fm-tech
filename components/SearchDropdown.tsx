'use client';

interface SearchDropdownProps {
  items: string[];
  selectedIndex: number;
  onSelect: (item: string) => void;
  onHover: (index: number) => void;
}

export function SearchDropdown({
  items,
  selectedIndex,
  onSelect,
  onHover,
}: SearchDropdownProps) {
  if (items.length === 0) return null;

  return (
    <div className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <ul role="listbox" aria-label="Search history">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            role="option"
            aria-selected={index === selectedIndex}
            className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
              index === selectedIndex
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
            onClick={() => onSelect(item)}
            onMouseEnter={() => onHover(index)}
          >
            <div className="flex items-center gap-3">
              <svg
                className="h-4 w-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
