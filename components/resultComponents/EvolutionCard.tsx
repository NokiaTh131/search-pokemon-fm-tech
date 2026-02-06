import Link from "next/link";
import Image from 'next/image';
import { PokemonDetails } from "@/lib/graphql/types";

export function EvolutionCard({ evolution }: { evolution: PokemonDetails }) {
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
