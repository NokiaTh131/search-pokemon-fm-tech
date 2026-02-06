'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Pokemon, Attack, PokemonDetails, PokemonEvolution } from '@/lib/graphql/types';

interface PokemonResultProps {
  pokemon: Pokemon;
}

function AttackCard({ attack, variant }: { attack: Attack; variant: 'fast' | 'special' }) {
  return (
    <div
      className={`rounded-lg p-3 ${variant === 'fast'
        ? 'bg-amber-50 dark:bg-amber-950/30'
        : 'bg-purple-50 dark:bg-purple-950/30'
        }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{attack.name}</span>
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {attack.damage} DMG
        </span>
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-500">{attack.type}</span>
    </div>
  );
}

function EvolutionCard({ evolution }: { evolution: PokemonDetails }) {
  return (
    <Link
      href={`/search?name=${encodeURIComponent(evolution.name)}`}
      className="group flex flex-col items-center rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-600"
    >
      {evolution.image && (
        <div className="relative mb-2 h-20 w-20">
          <Image
            src={evolution.image}
            alt={evolution.name}
            fill
            className="object-contain transition-transform group-hover:scale-110"
            sizes="80px"
          />
        </div>
      )}
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {evolution.name}
      </span>
      <span className="text-xs text-zinc-500">#{evolution.number}</span>
    </Link>
  );
}

// Flatten evolution chain into a single array for display (unique by id)
function flattenEvolutions(evolutions: PokemonEvolution[] | null): PokemonDetails[] {
  if (!evolutions) return [];

  const seen = new Set<string>();
  const result: PokemonDetails[] = [];

  for (const evo of evolutions) {
    if (!seen.has(evo.id)) {
      seen.add(evo.id);
      result.push(evo);
    }
    if (evo.evolutions) {
      for (const nestedEvo of evo.evolutions) {
        if (!seen.has(nestedEvo.id)) {
          seen.add(nestedEvo.id);
          result.push(nestedEvo);
        }
      }
    }
  }

  return result;
}

function TypeBadge({ type }: { type: string }) {
  const typeColors: Record<string, string> = {
    Normal: 'bg-gray-400',
    Fire: 'bg-red-500',
    Water: 'bg-blue-500',
    Electric: 'bg-yellow-400',
    Grass: 'bg-green-500',
    Ice: 'bg-cyan-300',
    Fighting: 'bg-orange-700',
    Poison: 'bg-purple-500',
    Ground: 'bg-amber-600',
    Flying: 'bg-indigo-300',
    Psychic: 'bg-pink-500',
    Bug: 'bg-lime-500',
    Rock: 'bg-stone-500',
    Ghost: 'bg-violet-700',
    Dragon: 'bg-indigo-600',
    Dark: 'bg-zinc-700',
    Steel: 'bg-slate-400',
    Fairy: 'bg-pink-300',
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${typeColors[type] || 'bg-zinc-500'
        }`}
    >
      {type}
    </span>
  );
}

export function PokemonResult({ pokemon }: PokemonResultProps) {
  // use memo for avoid recomputation on re-renders
  const allEvolutions = useMemo(
    () => flattenEvolutions(pokemon.evolutions),
    [pokemon.evolutions]
  );

  return (
    <article className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
      <header className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
        {pokemon.image && (
          <div className="relative h-32 w-32 shrink-0">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="128px"
              priority
            />
          </div>
        )}
        <div className="text-center sm:text-left">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">#{pokemon.number}</p>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {pokemon.name}
          </h2>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">{pokemon.classification}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
          <p className="text-xs text-zinc-500">Max CP</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{pokemon.maxCP}</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
          <p className="text-xs text-zinc-500">Max HP</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{pokemon.maxHP}</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
          <p className="text-xs text-zinc-500">Height</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {pokemon.height.minimum} - {pokemon.height.maximum}
          </p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800">
          <p className="text-xs text-zinc-500">Weight</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {pokemon.weight.minimum} - {pokemon.weight.maximum}
          </p>
        </div>
      </section>

      {/* Attacks */}
      <section className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Attacks</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Fast Attacks */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-amber-600 dark:text-amber-400">
              Fast Attacks
            </h4>
            <div className="space-y-2">
              {pokemon.attacks.fast.map((attack) => (
                <AttackCard key={attack.name} attack={attack} variant="fast" />
              ))}
            </div>
          </div>
          {/* Special Attacks */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400">
              Special Attacks
            </h4>
            <div className="space-y-2">
              {pokemon.attacks.special.map((attack) => (
                <AttackCard key={attack.name} attack={attack} variant="special" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weaknesses & Resistant */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">Weaknesses</h3>
          <div className="flex flex-wrap gap-1">
            {pokemon.weaknesses.map((weakness) => (
              <TypeBadge key={weakness} type={weakness} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">
            Resistant
          </h3>
          <div className="flex flex-wrap gap-1">
            {pokemon.resistant.map((resist) => (
              <TypeBadge key={resist} type={resist} />
            ))}
          </div>
        </div>
      </section>

      {/* Evolutions */}
      {allEvolutions.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Evolution Chain
          </h3>
          {pokemon.evolutionRequirements && (
            <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
              Requires {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {allEvolutions.map((evolution, index) => (
              <div key={evolution.id} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-zinc-400 dark:text-zinc-500">→</span>
                )}
                <EvolutionCard evolution={evolution} />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
