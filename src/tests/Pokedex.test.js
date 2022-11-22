import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';
import { Pokedex } from '../pages';

describe('<Pokedex />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: 'Próximo Pokémon' });

    pokemonList.forEach((pokemon) => {
      const { name } = pokemon;
      const pokeImg = screen.getByRole('img', { name: `${name} sprite` });
      userEvent.click(btn);
      expect(pokeImg).toBeInTheDocument();
    });

    expect(btn).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    const btnBug = screen.getByRole('button', { name: 'Bug' });
    const btnPoison = screen.getByRole('button', { name: 'Poison' });
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    const btnDragon = screen.getByRole('button', { name: 'Dragon' });
    const btn = screen.getByRole('button', { name: 'Próximo Pokémon' });

    userEvent.click(btnDragon);
    const pokemon = screen.getByRole('img', { name: 'Dragonair sprite' });
    expect(pokemon).toBeInTheDocument();
    expect(btn).toBeDisabled();

    userEvent.click(btnAll);
    const pikachu = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pikachu).toBeInTheDocument();

    expect(allButtons).toHaveLength(7);
    expect(btnAll).toBeInTheDocument();
    expect(btnEletric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
  });
});
