import { gql } from "@apollo/client";

const POKEMON_DETAILS_FRAGMENT = gql`
  fragment PokemonDetails on Pokemon {
    id
    number
    name
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    evolutionRequirements {
      amount
      name
    }
  }
`;

const POKEMON_EVOLUTION_FRAGMENT = gql`
  fragment PokemonEvolutionDetails on Pokemon {
    id
    name
    number
    image
  }
`;

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      ...PokemonDetails
      evolutions {
        ...PokemonEvolutionDetails
        evolutions {
          ...PokemonEvolutionDetails
        }
      }
    }
  }
  ${POKEMON_DETAILS_FRAGMENT}
  ${POKEMON_EVOLUTION_FRAGMENT}
`;
