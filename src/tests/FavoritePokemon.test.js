import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('<FavoritePokemon />', () => {
  it('testa  Página Favorites ', () => {
    renderWithRouter(<FavoritePokemon />);

    const heading = screen.getByRole('heading', { name: 'Favorite Pokémon', level: 2 });
    const paragrafo = screen.getByText('No favorite Pokémon found');

    expect(heading).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
  });

  it('mesma snapshot', () => {
    const { container } = renderWithRouter(<FavoritePokemon />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
