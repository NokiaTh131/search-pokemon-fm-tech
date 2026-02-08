import { Suspense } from "react";
import { redirect } from "next/navigation";
import { SearchInput, PokemonSearch, PokemonSkeleton, Header, Footer } from "@/components";
import { getClient } from "@/lib/apollo-client";
import { GET_POKEMON } from "@/lib/graphql/queries";

interface SearchPageProps {
  searchParams: Promise<{ name?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const pokemonName = params.name;

  if (!pokemonName) {
    redirect("/");
  }

  let initialData = null;

  try {
    const { data } = await getClient().query({
      query: GET_POKEMON,
      variables: { name: pokemonName },
    });
    initialData = data;
  } catch (error) {
    console.error("Error fetching pokemon data on server:", error);
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-8 font-sans dark:bg-zinc-950">
      <Header />

      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <Suspense fallback={<div className="h-14 w-full max-w-md animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />}>
          <SearchInput initialValue={pokemonName} />
        </Suspense>

        <Suspense fallback={<PokemonSkeleton />}>
          <PokemonSearch name={pokemonName} initialData={initialData} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
