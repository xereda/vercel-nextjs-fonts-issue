import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CriarSenha from './CriarSenha';

const renderHelper = () => {
  const { getByRole, getByLabelText } = render(<CriarSenha />);

  const password = getByLabelText(/Criar uma senha/i);
  const confirmPassword = getByLabelText(/Confirmar senha/i);
  const button = getByRole('button', { name: /continuar/i });

  return { password, confirmPassword, button };
};

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('CriarSenha Page', () => {
  test('deve renderizar a tela com o botão desabilitado', () => {
    useRouter.mockImplementation(() => ({ query: { token: 'ABCDEFG' } }));

    const { button } = renderHelper();

    expect(button).toBeDisabled();
  });

  test('deve habilitar o botão após preencher os campos corretamente', async () => {
    useRouter.mockImplementation(() => ({ query: { token: 'ABCDEFG' } }));

    const { password, confirmPassword, button } = renderHelper();

    await userEvent.type(password, 'Teste@123{tab}');
    await userEvent.type(confirmPassword, 'Teste@123{tab}');

    expect(button).toBeEnabled();
  });

  test('deve desabilitar o botão caso senha seja inválida', async () => {
    useRouter.mockImplementation(() => ({ query: { token: 'ABCDEFG' } }));

    const { password, confirmPassword, button } = renderHelper();

    await userEvent.type(password, '12345{tab}');
    await userEvent.type(confirmPassword, '12345{tab}');

    expect(button).toBeDisabled();
  });

  test('deve desabilitar o botão caso senhas sejam diferentes', async () => {
    useRouter.mockImplementation(() => ({ query: { token: 'ABCDEFG' } }));

    const { password, confirmPassword, button } = renderHelper();

    await userEvent.type(password, 'Teste@123{tab}');
    await userEvent.type(confirmPassword, '12345{tab}');

    expect(button).toBeDisabled();
  });

  test('deve mostrar o feedback após clicar no botão', async () => {
    useRouter.mockImplementation(() => ({ query: { token: 'ABCDEFG' } }));

    const { password, confirmPassword, button } = renderHelper();

    await userEvent.type(password, 'Teste@123{tab}');
    await userEvent.type(confirmPassword, 'Teste@123{tab}');
    await userEvent.click(button);

    expect(
      await screen.findByText(/Senha foi criada com sucesso!/i),
    ).toBeInTheDocument();
  });

  test('deve mostrar erro quando token não for informado', async () => {
    useRouter.mockImplementation(() => ({ query: { token: '' } }));
    render(<CriarSenha />);

    await waitFor(() => {
      expect(
        screen.getByText(/Token de validação não informado/i),
      ).toBeInTheDocument();
    });
  });
});
