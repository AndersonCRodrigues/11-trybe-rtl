import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('<App />', () => {
  it('os links de App devem estar na tela', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const pokemonLink = screen.getByRole('link', { name: /Favorite/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(pokemonLink).toBeInTheDocument();
  });

  it('testa se link home leva para "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const heading = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });

    const btn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    const btnBug = screen.getByRole('button', { name: 'Bug' });
    const btnPoison = screen.getByRole('button', { name: 'Poison' });
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    const btnDragon = screen.getByRole('button', { name: 'Dragon' });

    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const pokeLink = screen.getByRole('link', { name: 'More details' });

    const { pathname } = history.location;
    userEvent.click(homeLink);

    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnEletric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeLink).toBeInTheDocument();
  });

  it('testa se link about leva para "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    const paragrafo01 = screen.getByText(/This application simulates/i);
    const paragrafo02 = screen.getByText(/One can filter Pokémon/i);
    const image = screen.getByRole('img', { name: 'Pokédex' });

    expect(pathname).toBe('/about');
    expect(heading).toBeInTheDocument();
    expect(paragrafo01).toBeInTheDocument();
    expect(paragrafo02).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('testa se link Pokémon Favoritado leva para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    const heading = screen.getByRole('heading', { name: 'Favorite Pokémon', level: 2 });
    const paragrafo = screen.getByText('No favorite Pokémon found');

    expect(pathname).toBe('/favorites');
    expect(heading).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
  });

  it('testa se um caminho errado leva para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => (
      history.push('/notfound')
    ));

    const { pathname } = history.location;
    const heading = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });

    expect(pathname).toBe('/notfound');
    expect(heading).toBeInTheDocument();
  });

  it('mesma snapshot', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
