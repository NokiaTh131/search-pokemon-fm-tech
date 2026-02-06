import { Suspense } from "react";
import { SearchInput, PokemonSearch, PokemonSkeleton } from "@/components";

export default function Home() {
  const pokemonName = "";

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-8 font-sans dark:bg-zinc-950">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Pokemon Search
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Search for any Pokemon to see their stats, attacks, and evolutions
        </p>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <Suspense fallback={<div className="h-14 w-full max-w-md animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />}>
          <SearchInput initialValue={pokemonName} />
        </Suspense>

        {pokemonName && (
          <Suspense key={pokemonName} fallback={<PokemonSkeleton />}>
            <PokemonSearch name={pokemonName} />
          </Suspense>
        )}

        {!pokemonName && (
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            <p className="text-lg">Enter a Pokemon name to get started</p>
            <p className="mt-2 text-sm">Try: Pikachu, Charizard, Bulbasaur, Mewtwo</p>
          </div>
        )}
      </main>

      <footer className="mt-auto pt-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
        <p>2026 Jakkapong Jinasen</p>
      </footer>
    </div>
  );
}
