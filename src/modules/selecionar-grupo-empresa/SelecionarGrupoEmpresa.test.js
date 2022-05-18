import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import { sessionState } from '@/store/index';
import userEvent from '@testing-library/user-event';
import SelecionarGrupoEmpresa from './SelecionarGrupoEmpresa';

beforeEach(() => {
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
      {
        id: 3333,
        dataCadastro: '2022-05-05T12:23:00.000Z',
        idEmpresaPrincipal: 8375,
        idGrupoEmpresaPai: null,
        codigoExterno: null,
        nomeGrupo: 'Visser Grupo',
      },
    ],
  });
});

describe('Select group page', () => {
  test('deve renderizar o modal de seleção com os grupos do mock', async () => {
    render(<SelecionarGrupoEmpresa />);

    await waitFor(() => {
      expect(screen.getByText('Fleming Grupo')).toBeInTheDocument();
      expect(screen.getByText('McBride Grupo')).toBeInTheDocument();
      expect(screen.getByText('Visser Grupo')).toBeInTheDocument();
    });
  });

  test('deve atualizar localStorage com o grupo selecionado', async () => {
    render(<SelecionarGrupoEmpresa />);

    const group = screen.getByText('McBride Grupo');
    expect(group).toBeEnabled();

    await userEvent.click(group);

    await waitFor(() => {
      const sessionString = localStorage.getItem('session');
      const session = JSON.parse(sessionString);
      expect(session.grupoEmpresa.nomeGrupo).toBe('McBride Grupo');
    });
  });

  test('deve renderizar erro', async () => {
    render(<SelecionarGrupoEmpresa />);

    server.use(
      rest.get('/api/user-status', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' }),
        );
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole('error')).toBeInTheDocument();
    });
  });
});
