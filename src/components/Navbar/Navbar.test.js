import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('deve renderizar os links para as rotas principais', () => {
    render(<Navbar />);

    expect(screen.queryByText('Pedidos').closest('a')).toHaveAttribute(
      'href',
      '/dashboard',
    );
    expect(
      screen.queryByText('Gerenciar funcionários').closest('a'),
    ).toHaveAttribute('href', '/employees');
    expect(screen.queryByText('Financeiro').closest('a')).toHaveAttribute(
      'href',
      '/financial',
    );
    expect(screen.queryByText('Relatórios').closest('a')).toHaveAttribute(
      'href',
      '/reports',
    );
  });
});
