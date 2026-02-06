export function PokemonSkeleton() {
  return (
    <div className="w-full max-w-2xl animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-32 w-32 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="w-full text-center sm:text-left">
          <div className="mx-auto mb-2 h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-700 sm:mx-0" />
          <div className="mx-auto mb-2 h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-700 sm:mx-0" />
          <div className="mx-auto mb-3 h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700 sm:mx-0" />
          <div className="flex justify-center gap-2 sm:justify-start">
            <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <div className="mx-auto mb-2 h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mx-auto h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>

      {/* Attacks */}
      <div className="mb-6">
        <div className="mb-3 h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-16 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-16 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Evolutions */}
      <div>
        <div className="mb-3 h-6 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex h-32 w-28 flex-col items-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
            >
              <div className="mb-2 h-16 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
