import { Suspense } from "react";
import { SearchInput, PokemonSearch, PokemonSkeleton, Header, Footer } from "@/components";

export default function Home() {
  const pokemonName = "";

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-8 font-sans dark:bg-zinc-950">
      <Header />

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

      <Footer />
    </div>
  );
}
