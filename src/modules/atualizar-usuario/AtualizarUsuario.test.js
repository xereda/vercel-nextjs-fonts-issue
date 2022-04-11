import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useState } from '@hookstate/core';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import { sessionStore } from '@/store/index';
import AtualizarUsuario from './AtualizarUsuario';

describe('User update page', () => {
  test('deve iniciar o formulario com o botao "atualizar" desabilitado', () => {
    render(<AtualizarUsuario />);

    expect(screen.getByText('Atualizar')).toBeDisabled();
  });

  test('deve apresentar mensagem de erro ao informar data ou telefone invalidos', async () => {
    render(<AtualizarUsuario />);

    const user = userEvent.setup();
    const birthdate = screen.getByLabelText(/Data de nascimento/i);
    const phone = screen.getByLabelText(/Telefone/i);

    await user.type(birthdate, '99999999{tab}');
    await user.type(phone, '999999{tab}');

    await waitFor(() => {
      expect(screen.getByText('Data inválida')).toBeInTheDocument();
      expect(screen.getByText('Telefone inválido')).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Atualizar'})).toBeDisabled();
    });
  });

  test('deve apresentar mensagem de campo obrigatorio quando os campos não forem informados', async () => {
    render(<AtualizarUsuario />);

    const birthdate = screen.getByLabelText(/Data de nascimento/i);
    const phone = screen.getByLabelText(/Telefone/i);
    const mother = screen.getByLabelText(/Nome da mãe/i);

    await userEvent.type(birthdate, '1{tab}');
    await userEvent.type(phone, '1{tab}');
    await userEvent.type(mother, '1{tab}');
    await userEvent.clear(birthdate);
    await userEvent.clear(phone);
    await userEvent.clear(mother);

    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(3);
    expect(screen.getByText('atualizar', { exact: false })).toBeDisabled();
  });

  test('deve habilitar o botao quando todos os campos forem informados corretamente', async () => {
    render(<AtualizarUsuario />);

    const birthdate = screen.getByLabelText(/Data de nascimento/i);
    const phone = screen.getByLabelText(/Telefone/i);
    const mother = screen.getByLabelText(/Nome da mãe/i);

    await userEvent.type(birthdate, '18121976{tab}');
    await userEvent.type(phone, '11995674852{tab}');
    await userEvent.type(mother, '1{tab}');

    expect(screen.queryByText(/data inválida/i)).not.toBeInTheDocument();
    expect(screen.queryAllByText(/campo obrigatório/i)).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeEnabled();
  });

  test('deve renderizar erro', async () => {
    render(<AtualizarUsuario />);

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

  test('deve renderizar o form integrado ao mock com mascara aplicada', async () => {
    renderHook(() => {
      const session = useState(sessionStore);
      session.set({
        usuario: {
          id: 999999,
          email: 'jackson.schroeder@sciensa.com',
          cpf: '11651232903',
          nome: 'Jackson Ricardo Schroeder',
          anonimizado: false,
          dataNascimento: '1976-12-18',
          ddd: '11',
          nomeMae: '',
          status: 'ATIVO',
          telefone: '995674852',
        },
      });
    });

    render(<AtualizarUsuario />);

    const birthdate = screen.getByLabelText(/Data de nascimento/i);
    const phone = screen.getByLabelText(/Telefone/i);
    const motherName = screen.getByLabelText(/Nome da mãe/i);

    await waitFor(() => {
      expect(birthdate).toHaveValue('18/12/1976');
      expect(phone).toHaveValue('(11) 99567-4852');
      expect(motherName).toHaveValue('');
    });
  });
});
