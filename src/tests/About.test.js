import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('<About />', () => {
  it('testa se a página contem informações sobre a pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    const paragrafo01 = screen.getByText(/This application simulates/i);
    const paragrafo02 = screen.getByText(/One can filter Pokémon/i);
    const image = screen.getByRole('img', { name: 'Pokédex' });
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(heading).toBeInTheDocument();
    expect(paragrafo01).toBeInTheDocument();
    expect(paragrafo02).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageSrc);
  });

  it('mesma snapshot', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
