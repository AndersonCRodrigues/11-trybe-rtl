import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  it('testa se um caminho errado leva para "Not Found"', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    const image = screen.getByRole('img', { name: 'Pikachu crying because the page requested was not found' });
    const imagemSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imagemSrc);
  });

  it('mesma snapshot', () => {
    const { container } = renderWithRouter(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
