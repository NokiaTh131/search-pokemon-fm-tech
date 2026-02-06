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

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('PokemonResult Component', () => {
  describe('Type Assertions', () => {
    it('should display Bulbasaur with type Grass', () => {
      render(<PokemonResult pokemon={mockBulbasaur} />);
      
      // Assert Pokemon name is displayed
      expect(screen.getByRole('heading', { name: 'Bulbasaur' })).toBeInTheDocument();
      
      // Get the header element and find type badges within it
      const header = screen.getByRole('banner');
      
      // Assert Grass type badge is displayed in header
      expect(within(header).getByText('Grass')).toBeInTheDocument();
      
      // Bulbasaur also has Poison type
      expect(within(header).getByText('Poison')).toBeInTheDocument();
      
      // Assert types array contains Grass
      expect(mockBulbasaur.types).toContain('Grass');
    });

    it('should display Charmander with type Fire', () => {
      render(<PokemonResult pokemon={mockCharmander} />);
      
      // Assert Pokemon name is displayed
      expect(screen.getByRole('heading', { name: 'Charmander' })).toBeInTheDocument();
      
      // Get the header element and find type badges within it
      const header = screen.getByRole('banner');
      
      // Assert Fire type badge is displayed in header
      expect(within(header).getByText('Fire')).toBeInTheDocument();
      
      // Assert types array contains Fire
      expect(mockCharmander.types).toContain('Fire');
    });

    it('should display Squirtle with type Water', () => {
      render(<PokemonResult pokemon={mockSquirtle} />);
      
      // Assert Pokemon name is displayed
      expect(screen.getByRole('heading', { name: 'Squirtle' })).toBeInTheDocument();
      
      // Get the header element and find type badges within it
      const header = screen.getByRole('banner');
      
      // Assert Water type badge is displayed in header
      expect(within(header).getByText('Water')).toBeInTheDocument();
      
      // Assert types array contains Water
      expect(mockSquirtle.types).toContain('Water');
    });
  });

  describe('Pokemon Details Display', () => {
    it('should display Pokemon number and classification', () => {
      render(<PokemonResult pokemon={mockBulbasaur} />);
      
      expect(screen.getByText('#001')).toBeInTheDocument();
      expect(screen.getByText('Seed Pokemon')).toBeInTheDocument();
    });

    it('should display Pokemon stats', () => {
      render(<PokemonResult pokemon={mockCharmander} />);
      
      expect(screen.getByText('Max CP')).toBeInTheDocument();
      expect(screen.getByText('841')).toBeInTheDocument();
      expect(screen.getByText('Max HP')).toBeInTheDocument();
      expect(screen.getByText('955')).toBeInTheDocument();
    });

    it('should display Pokemon attacks', () => {
      render(<PokemonResult pokemon={mockSquirtle} />);
      
      // Fast attacks
      expect(screen.getByText('Fast Attacks')).toBeInTheDocument();
      expect(screen.getByText('Bubble')).toBeInTheDocument();
      expect(screen.getByText('Tackle')).toBeInTheDocument();
      
      // Special attacks
      expect(screen.getByText('Special Attacks')).toBeInTheDocument();
      expect(screen.getByText('Aqua Jet')).toBeInTheDocument();
      expect(screen.getByText('Aqua Tail')).toBeInTheDocument();
    });

    it('should display evolutions when available', () => {
      render(<PokemonResult pokemon={mockBulbasaur} />);
      
      expect(screen.getByText('Evolution Chain')).toBeInTheDocument();
      expect(screen.getByText('Ivysaur')).toBeInTheDocument();
      expect(screen.getByText('#002')).toBeInTheDocument();
      // Also check nested evolution (Venusaur)
      expect(screen.getByText('Venusaur')).toBeInTheDocument();
      expect(screen.getByText('#003')).toBeInTheDocument();
    });

    it('should display weaknesses and resistances', () => {
      render(<PokemonResult pokemon={mockCharmander} />);
      
      expect(screen.getByText('Weaknesses')).toBeInTheDocument();
      expect(screen.getByText('Resistant')).toBeInTheDocument();
    });
  });

  describe('Evolution Links', () => {
    it('should render evolution as a link', () => {
      render(<PokemonResult pokemon={mockBulbasaur} />);
      
      const ivysaurLink = screen.getByRole('link', { name: /Ivysaur/i });
      expect(ivysaurLink).toHaveAttribute('href', '/search?name=Ivysaur');
    });
  });
});
