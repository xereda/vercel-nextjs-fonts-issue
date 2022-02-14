import { render, screen } from '@testing-library/react';
import iconBen from '@/public/svg/icon-ben.svg';
import Image from './Image';

describe('Image Wrapper for Next/Image', () => {
  test('deve renderizar o componente de imagem', () => {
    render(<Image src={iconBen} alt="logo da ben" />);

    expect(screen.getByText('Next image stub')).toBeInTheDocument();
  });
});