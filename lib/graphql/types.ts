export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface EvolutionRequirement {
  amount: number;
  name: string;
}

export interface PokemonDetails {
  id: string;
  number: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutionRequirements: EvolutionRequirement | null;
}

// evolution with nested
export interface PokemonEvolution extends PokemonDetails {
  evolutions: PokemonDetails[] | null;
}

// main Pokemon type
export interface Pokemon extends PokemonDetails {
  evolutions: PokemonEvolution[] | null;
}

export interface PokemonQueryVariables {
  name?: string;
}

export interface PokemonQueryResult {
  pokemon: Pokemon | null;
}
