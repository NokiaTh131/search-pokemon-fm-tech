import { gql } from '@apollo/client';

export const POKEMON_DETAILS_FRAGMENT = gql`
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

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      ...PokemonDetails
      evolutions {
        ...PokemonDetails
        evolutions {
          ...PokemonDetails
        }
      }
    }
  }
  ${POKEMON_DETAILS_FRAGMENT}
`;
