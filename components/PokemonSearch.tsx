'use client';

import { useQuery } from '@apollo/client/react';
import { GET_POKEMON } from '@/lib/graphql/queries';
import type { PokemonQueryResult, PokemonQueryVariables } from '@/lib/graphql/types';
import { PokemonResult } from './PokemonResult';
import { PokemonSkeleton } from './PokemonSkeleton';

interface PokemonSearchProps {
  name: string;
  initialData?: any;
}

export function PokemonSearch({ name, initialData }: PokemonSearchProps) {

  const { data, loading, error } = useQuery<PokemonQueryResult, PokemonQueryVariables>(
    GET_POKEMON,
    {
      variables: { name },
      skip: !name,
      fetchPolicy: "cache-first",
    }
  );

  // use data from query if available
  const displayData = data || initialData;


  if (loading && !displayData) {
    return <PokemonSkeleton />;
  }

  if (error && !displayData) {
    return (
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950/30">
        <h2 className="mb-2 text-lg font-semibold text-red-700 dark:text-red-400">
          Error Loading Pokemon
        </h2>
        <p className="text-sm text-red-600 dark:text-red-300">{error.message}</p>
      </div>
    );
  }

  if (!displayData?.pokemon) {
    if (loading) return <PokemonSkeleton />;

    return (
      <div className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-800 dark:bg-amber-950/30">
        <h2 className="mb-2 text-lg font-semibold text-amber-700 dark:text-amber-400">
          Pokemon Not Found
        </h2>
        <p className="text-sm text-amber-600 dark:text-amber-300">
          No Pokemon found with the name &quot;{name}&quot;. Please try a different name.
        </p>
      </div>
    );
  }

  return <PokemonResult pokemon={displayData.pokemon} />;
}
