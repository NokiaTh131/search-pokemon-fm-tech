import type { Pokemon, PokemonEvolution } from '@/lib/graphql/types';

// Helper to create a base Pokemon evolution (with nested evolutions)
const createVenusaur: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDM=',
  number: '003',
  name: 'Venusaur',
  classification: 'Seed Pokemon',
  types: ['Grass', 'Poison'],
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  fleeRate: 0.05,
  maxCP: 2392,
  maxHP: 2580,
  image: 'https://img.pokemondb.net/artwork/venusaur.jpg',
  weight: { minimum: '87.5kg', maximum: '112.5kg' },
  height: { minimum: '1.75m', maximum: '2.25m' },
  attacks: {
    fast: [
      { name: 'Razor Leaf', type: 'Grass', damage: 15 },
      { name: 'Vine Whip', type: 'Grass', damage: 7 },
    ],
    special: [
      { name: 'Petal Blizzard', type: 'Grass', damage: 65 },
      { name: 'Sludge Bomb', type: 'Poison', damage: 55 },
      { name: 'Solar Beam', type: 'Grass', damage: 120 },
    ],
  },
  evolutionRequirements: null,
  evolutions: null,
};

const createIvysaur: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDI=',
  number: '002',
  name: 'Ivysaur',
  classification: 'Seed Pokemon',
  types: ['Grass', 'Poison'],
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  fleeRate: 0.07,
  maxCP: 1483,
  maxHP: 1632,
  image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
  weight: { minimum: '11.38kg', maximum: '14.63kg' },
  height: { minimum: '0.88m', maximum: '1.13m' },
  attacks: {
    fast: [
      { name: 'Razor Leaf', type: 'Grass', damage: 15 },
      { name: 'Vine Whip', type: 'Grass', damage: 7 },
    ],
    special: [
      { name: 'Power Whip', type: 'Grass', damage: 70 },
      { name: 'Sludge Bomb', type: 'Poison', damage: 55 },
      { name: 'Solar Beam', type: 'Grass', damage: 120 },
    ],
  },
  evolutionRequirements: { amount: 100, name: 'Bulbasaur candies' },
  evolutions: [createVenusaur],
};

export const mockBulbasaur: Pokemon = {
  id: 'UG9rZW1vbjowMDE=',
  number: '001',
  name: 'Bulbasaur',
  classification: 'Seed Pokemon',
  types: ['Grass', 'Poison'],
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  fleeRate: 0.1,
  maxCP: 951,
  maxHP: 1071,
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
  weight: { minimum: '6.04kg', maximum: '7.76kg' },
  height: { minimum: '0.61m', maximum: '0.79m' },
  attacks: {
    fast: [
      { name: 'Tackle', type: 'Normal', damage: 12 },
      { name: 'Vine Whip', type: 'Grass', damage: 7 },
    ],
    special: [
      { name: 'Power Whip', type: 'Grass', damage: 70 },
      { name: 'Seed Bomb', type: 'Grass', damage: 40 },
      { name: 'Sludge Bomb', type: 'Poison', damage: 55 },
    ],
  },
  evolutionRequirements: { amount: 25, name: 'Bulbasaur candies' },
  evolutions: [createIvysaur],
};

const createCharizard: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDY=',
  number: '006',
  name: 'Charizard',
  classification: 'Flame Pokemon',
  types: ['Fire', 'Flying'],
  resistant: ['Fire', 'Grass', 'Fighting', 'Bug', 'Steel', 'Fairy'],
  weaknesses: ['Water', 'Electric', 'Rock'],
  fleeRate: 0.05,
  maxCP: 2413,
  maxHP: 2602,
  image: 'https://img.pokemondb.net/artwork/charizard.jpg',
  weight: { minimum: '79.19kg', maximum: '101.81kg' },
  height: { minimum: '1.49m', maximum: '1.91m' },
  attacks: {
    fast: [
      { name: 'Ember', type: 'Fire', damage: 10 },
      { name: 'Wing Attack', type: 'Flying', damage: 9 },
    ],
    special: [
      { name: 'Dragon Claw', type: 'Dragon', damage: 35 },
      { name: 'Fire Blast', type: 'Fire', damage: 100 },
      { name: 'Flamethrower', type: 'Fire', damage: 55 },
    ],
  },
  evolutionRequirements: null,
  evolutions: null,
};

const createCharmeleon: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDU=',
  number: '005',
  name: 'Charmeleon',
  classification: 'Flame Pokemon',
  types: ['Fire'],
  resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
  weaknesses: ['Water', 'Ground', 'Rock'],
  fleeRate: 0.07,
  maxCP: 1411,
  maxHP: 1557,
  image: 'https://img.pokemondb.net/artwork/charmeleon.jpg',
  weight: { minimum: '16.63kg', maximum: '21.38kg' },
  height: { minimum: '0.96m', maximum: '1.24m' },
  attacks: {
    fast: [
      { name: 'Ember', type: 'Fire', damage: 10 },
      { name: 'Scratch', type: 'Normal', damage: 6 },
    ],
    special: [
      { name: 'Fire Punch', type: 'Fire', damage: 40 },
      { name: 'Flame Burst', type: 'Fire', damage: 30 },
      { name: 'Flamethrower', type: 'Fire', damage: 55 },
    ],
  },
  evolutionRequirements: { amount: 100, name: 'Charmander candies' },
  evolutions: [createCharizard],
};

export const mockCharmander: Pokemon = {
  id: 'UG9rZW1vbjowMDQ=',
  number: '004',
  name: 'Charmander',
  classification: 'Lizard Pokemon',
  types: ['Fire'],
  resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
  weaknesses: ['Water', 'Ground', 'Rock'],
  fleeRate: 0.1,
  maxCP: 841,
  maxHP: 955,
  image: 'https://img.pokemondb.net/artwork/charmander.jpg',
  weight: { minimum: '7.44kg', maximum: '9.56kg' },
  height: { minimum: '0.53m', maximum: '0.68m' },
  attacks: {
    fast: [
      { name: 'Ember', type: 'Fire', damage: 10 },
      { name: 'Scratch', type: 'Normal', damage: 6 },
    ],
    special: [
      { name: 'Flame Burst', type: 'Fire', damage: 30 },
      { name: 'Flame Charge', type: 'Fire', damage: 25 },
      { name: 'Flamethrower', type: 'Fire', damage: 55 },
    ],
  },
  evolutionRequirements: { amount: 25, name: 'Charmander candies' },
  evolutions: [createCharmeleon],
};

const createBlastoise: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDk=',
  number: '009',
  name: 'Blastoise',
  classification: 'Shellfish Pokemon',
  types: ['Water'],
  resistant: ['Fire', 'Water', 'Ice', 'Steel'],
  weaknesses: ['Electric', 'Grass'],
  fleeRate: 0.05,
  maxCP: 2291,
  maxHP: 2542,
  image: 'https://img.pokemondb.net/artwork/blastoise.jpg',
  weight: { minimum: '74.81kg', maximum: '96.19kg' },
  height: { minimum: '1.4m', maximum: '1.8m' },
  attacks: {
    fast: [
      { name: 'Bite', type: 'Dark', damage: 6 },
      { name: 'Water Gun', type: 'Water', damage: 6 },
    ],
    special: [
      { name: 'Flash Cannon', type: 'Steel', damage: 60 },
      { name: 'Gunk Shot', type: 'Poison', damage: 65 },
      { name: 'Hydro Pump', type: 'Water', damage: 90 },
    ],
  },
  evolutionRequirements: null,
  evolutions: null,
};

const createWartortle: PokemonEvolution = {
  id: 'UG9rZW1vbjowMDg=',
  number: '008',
  name: 'Wartortle',
  classification: 'Turtle Pokemon',
  types: ['Water'],
  resistant: ['Fire', 'Water', 'Ice', 'Steel'],
  weaknesses: ['Electric', 'Grass'],
  fleeRate: 0.07,
  maxCP: 1435,
  maxHP: 1582,
  image: 'https://img.pokemondb.net/artwork/wartortle.jpg',
  weight: { minimum: '19.69kg', maximum: '25.31kg' },
  height: { minimum: '0.88m', maximum: '1.13m' },
  attacks: {
    fast: [
      { name: 'Bite', type: 'Dark', damage: 6 },
      { name: 'Water Gun', type: 'Water', damage: 6 },
    ],
    special: [
      { name: 'Aqua Jet', type: 'Water', damage: 25 },
      { name: 'Gunk Shot', type: 'Poison', damage: 65 },
      { name: 'Hydro Pump', type: 'Water', damage: 90 },
    ],
  },
  evolutionRequirements: { amount: 100, name: 'Squirtle candies' },
  evolutions: [createBlastoise],
};

export const mockSquirtle: Pokemon = {
  id: 'UG9rZW1vbjowMDc=',
  number: '007',
  name: 'Squirtle',
  classification: 'Tiny Turtle Pokemon',
  types: ['Water'],
  resistant: ['Fire', 'Water', 'Ice', 'Steel'],
  weaknesses: ['Electric', 'Grass'],
  fleeRate: 0.1,
  maxCP: 891,
  maxHP: 1008,
  image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
  weight: { minimum: '7.88kg', maximum: '10.13kg' },
  height: { minimum: '0.44m', maximum: '0.56m' },
  attacks: {
    fast: [
      { name: 'Bubble', type: 'Water', damage: 25 },
      { name: 'Tackle', type: 'Normal', damage: 12 },
    ],
    special: [
      { name: 'Aqua Jet', type: 'Water', damage: 25 },
      { name: 'Aqua Tail', type: 'Water', damage: 45 },
      { name: 'Water Pulse', type: 'Water', damage: 35 },
    ],
  },
  evolutionRequirements: { amount: 25, name: 'Squirtle candies' },
  evolutions: [createWartortle],
};

export const mockPokemonMap = {
  Bulbasaur: mockBulbasaur,
  Charmander: mockCharmander,
  Squirtle: mockSquirtle,
};
