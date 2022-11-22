import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('<PokemonDetails/>', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: /More/i });

    expect(pokeLink).toBeInTheDocument();
    userEvent.click(pokeLink);

    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const heading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const paragrafo = screen.getByText(/This intelligent Pokémon/i);
    const heading2 = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    const label = screen.getByLabelText('Pokémon favoritado?');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const detail = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });

    expect(detail).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageSrc);
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toBeInTheDocument();

    expect(pokeLink).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: 'More details' });

    expect(pokeLink).toBeInTheDocument();
    userEvent.click(pokeLink);

    const mapImgs = screen.getAllByRole('img', { name: 'Pikachu location' });
    const map01Src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const map02Src = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const parag01 = screen.getByText('Kanto Viridian Forest');
    const parag02 = screen.getByText('Kanto Power Plant');

    expect(mapImgs).toHaveLength(2);
    expect(mapImgs[0]).toBeInTheDocument();
    expect(mapImgs[0]).toHaveAttribute('src', map01Src);
    expect(mapImgs[1]).toBeInTheDocument();
    expect(mapImgs[1]).toHaveAttribute('src', map02Src);
    expect(parag01).toBeInTheDocument();
    expect(parag02).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: 'More details' });

    expect(pokeLink).toBeInTheDocument();
    userEvent.click(pokeLink);

    const label = screen.getByLabelText('Pokémon favoritado?');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkBox);

    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    const starSrc = '/star-icon.svg';

    expect(label).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', starSrc);
  });
});
