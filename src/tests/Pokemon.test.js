import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('<Pokemon />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const pokeLink = screen.getByRole('link', { name: /More/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageSrc);
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeLink).toBeInTheDocument();
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste', () => {
    const { history } = renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: 'More details' });

    expect(pokeLink).toBeInTheDocument();

    userEvent.click(pokeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');

    const heading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const paragrafo = screen.getByText(/This intelligent Pokémon/i);
    const heading2 = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    const mapImgs = screen.getAllByRole('img', { name: 'Pikachu location' });
    const parag01 = screen.getByText('Kanto Viridian Forest');
    const parag02 = screen.getByText('Kanto Power Plant');
    const label = screen.getByLabelText('Pokémon favoritado?');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkBox);

    expect(heading).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(mapImgs).toHaveLength(2);
    expect(mapImgs[0]).toBeInTheDocument();
    expect(mapImgs[1]).toBeInTheDocument();
    expect(parag01).toBeInTheDocument();
    expect(parag02).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokeLink);

    const label = screen.getByLabelText('Pokémon favoritado?');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    checkBox.checked = true;

    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    const starSrc = '/star-icon.svg';

    expect(label).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toHaveAttribute('checked', '');
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', starSrc);
  });
});
