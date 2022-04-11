import { fireEvent, render, screen } from '@testing-library/react';
import TermoPrivacidade from './TermoPrivacidade';

beforeEach(() => render(<TermoPrivacidade />));

describe('Term privacy component', () => {
  test('deve carregar a página com o botão "li e aceito o termo" desabilitado', () => {
    expect(screen.getByText('Li e aceito o termo')).toBeDisabled();
  });

  test('deve exibir tooltip quando botão estiver desabilitado', () => {
    expect(screen.getByRole('button', { name: 'Li e aceito o termo' })).toBeDisabled();
    expect(screen.getByText('você precisa ler o termo antes de continuar.', { exact: false })).toBeEnabled();
  });

  test('deve habilitar o botão quando termo for scrollado até o final', () => {
    const container = screen.getByRole('term');

    fireEvent.scroll(container, { target: { scrollY: 500 } });

    expect(screen.getByRole('button', { name: 'Li e aceito o termo' })).toBeEnabled();
  });
});
