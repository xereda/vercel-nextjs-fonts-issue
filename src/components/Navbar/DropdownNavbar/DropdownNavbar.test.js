import { render, screen, waitFor } from '@testing-library/react';
import DropdownNavbar from './DropdownNavbar';

describe('DropdownNavbar component', () => {
  test('deve renderizar o dropdown do navbar e seus links', async () => {
    render(<DropdownNavbar />);

    await waitFor(() => {
      expect(screen.getByText('Permissão de acesso').closest('a')).toHaveAttribute('href', '/permissao-acesso');
      expect(screen.getByText('Converter arquivos').closest('a')).toHaveAttribute('href', '/conversor');
      expect(screen.getByText('Locais de entrega').closest('a')).toHaveAttribute('href', '/locais-entrega');
      expect(screen.getByText('Sair').closest('a')).toHaveAttribute('href', '/login');
    });
  });
});
