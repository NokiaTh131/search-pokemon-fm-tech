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

export interface PokemonEvolutionDetails {
  id: string;
  name: string;
  number: string;
  image: string;
}

// evolution with nested
export interface PokemonEvolution extends PokemonEvolutionDetails {
  evolutions: PokemonEvolutionDetails[] | null;
}

// main Pokemon type
export interface Pokemon extends PokemonDetails {
  evolutions: PokemonEvolution[] | null;
}

export interface PokemonQueryVariables {
  id?: string;
  name?: string;
}

export interface PokemonQueryResult {
  pokemon: Pokemon | null;
}
