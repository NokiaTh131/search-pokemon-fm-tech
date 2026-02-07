import { render, screen, within } from '@testing-library/react';
import { PokemonResult } from '@/components/PokemonResult';
import { mockBulbasaur, mockCharmander, mockSquirtle } from '@/__mocks__/pokemonMocks';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('PokemonResult Component', () => {
  describe('Type Assertions', () => {
    it('should display Bulbasaur with type Grass', () => {
      render(<PokemonResult pokemon={mockBulbasaur} />);

      // assert pokemon name is displayed
      expect(screen.getByRole('heading', { name: 'Bulbasaur' })).toBeInTheDocument();

      // get the header element and find type badges
      const header = screen.getByRole('banner');

      expect(within(header).getByText('Grass')).toBeInTheDocument();
      expect(within(header).getByText('Poison')).toBeInTheDocument();

      // assert types array contains Grass
      expect(mockBulbasaur.types).toContain('Grass');
    });

    it('should display Charmander with type Fire', () => {
      render(<PokemonResult pokemon={mockCharmander} />);

      expect(screen.getByRole('heading', { name: 'Charmander' })).toBeInTheDocument();

      const header = screen.getByRole('banner');

      expect(within(header).getByText('Fire')).toBeInTheDocument();

      // assert types array contains Fire
      expect(mockCharmander.types).toContain('Fire');
    });

    it('should display Squirtle with type Water', () => {
      render(<PokemonResult pokemon={mockSquirtle} />);

      expect(screen.getByRole('heading', { name: 'Squirtle' })).toBeInTheDocument();

      const header = screen.getByRole('banner');

      expect(within(header).getByText('Water')).toBeInTheDocument();

      // assert types array contains Water
      expect(mockSquirtle.types).toContain('Water');
    });
  });
});
