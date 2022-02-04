import { render, screen } from '@testing-library/react';
import VirtualAccount from './VirtualAccount';

describe('VirtualAccount component', () => {
  test('deve renderizar o componente com o valor default da prop', () => {
    render(<VirtualAccount />);

    expect(screen.queryByText('R$ 1.000,00')).toBeInTheDocument();
  });
});
