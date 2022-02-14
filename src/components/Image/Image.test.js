import { render, screen } from '@testing-library/react';
import Image from './Image';

describe('Image Wrapper for Next/Image', () => {
  test('deve renderizar o componente de imagem', () => {
    render(
      <Image src="/public/svg/icon-ben.svg" alt="logo da ben" layout="fill" />,
    );

    expect(
      screen.getByRole('img', { name: 'logo da ben' }),
    ).toBeInTheDocument();
  });
});
