import { render, screen, waitFor } from '@testing-library/react';
import { sessionState } from '@/store/index';
import userEvent from '@testing-library/user-event';
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

  test('deve renderizar o dropdown sem a opção trocar grupo quando não houver mais de um grupo', async () => {
    const { getByText, getByRole, queryByText } = render(<Navbar />);

    const dropdown = getByRole('dropdown');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(getByText('Permissão de acesso')).toBeInTheDocument();
      expect(getByText('Converter arquivos').closest('a')).toHaveAttribute(
        'href',
        '/conversor',
      );
      expect(getByText('Locais de entrega').closest('a')).toHaveAttribute(
        'href',
        '/locais-entrega',
      );
      expect(
        queryByText('Trocar grupo', { exact: false }),
      ).not.toBeInTheDocument();
      expect(getByText('Sair').closest('a')).toHaveAttribute('href', '/login');
    });
  });

  test('deve renderizar o dropdown com a opção trocar grupo quando houver mais de um grupo', async () => {
    const session = sessionState();
    session.merge({
      gruposEmpresa: [
        {
          id: 1111,
          dataCadastro: '2022-05-05T12:22:00.000Z',
          idEmpresaPrincipal: 8373,
          idGrupoEmpresaPai: null,
          codigoExterno: null,
          nomeGrupo: 'Fleming Grupo',
        },
        {
          id: 2222,
          dataCadastro: '2022-05-05T12:23:00.000Z',
          idEmpresaPrincipal: 8374,
          idGrupoEmpresaPai: null,
          codigoExterno: null,
          nomeGrupo: 'McBride Grupo',
        },
      ],
    });

    const { getByText, getByRole } = render(<Navbar />);

    const dropdown = getByRole('dropdown');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(getByText('Permissão de acesso')).toBeInTheDocument();
      expect(getByText('Converter arquivos').closest('a')).toHaveAttribute(
        'href',
        '/conversor',
      );
      expect(getByText('Locais de entrega').closest('a')).toHaveAttribute(
        'href',
        '/locais-entrega',
      );
      expect(getByText('Trocar grupo (2)').closest('a')).toHaveAttribute(
        'href',
        '/selecionar-grupo-empresa',
      );
      expect(getByText('Sair').closest('a')).toHaveAttribute('href', '/login');
    });
  });
});
