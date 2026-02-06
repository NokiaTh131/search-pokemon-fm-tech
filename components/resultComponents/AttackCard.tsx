import { Attack } from "@/lib/graphql/types";

export function AttackCard({ attack, variant }: { attack: Attack; variant: 'fast' | 'special' }) {
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
