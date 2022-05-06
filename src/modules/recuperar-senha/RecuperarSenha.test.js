import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecuperarSenha from './RecuperarSenha';

const renderHelper = () => {
  const { getByRole, getByLabelText } = render(<RecuperarSenha />);

  const cpf = getByLabelText(/CPF/i);
  const email = getByLabelText(/E-mail/i);
  const button = getByRole('button', { name: /continuar/i });

  return { cpf, email, button };
};

describe('RecuperarSenha Page', () => {
  test('deve renderizar com o botão inicialmente disabilitado', () => {
    const { button } = renderHelper();

    expect(button).toBeDisabled();
  });

  test('deve habilitar o botão após preencher os campos de login', async () => {
    const { cpf, email, button } = renderHelper();

    await userEvent.type(cpf, '11651232903{tab}');
    await userEvent.type(email, 'x@x.com{tab}');

    expect(button).toBeEnabled();
  });

  test('deve desabilitar o botão caso o cpf seja inválido', async () => {
    const { cpf, email, button } = renderHelper();

    await userEvent.type(cpf, '99999999999{tab}');
    await userEvent.type(email, 'x@x.com{tab}');

    expect(button).toBeDisabled();
  });

  test('deve desabilitar o botão caso o email seja inválido', async () => {
    const { cpf, email, button } = renderHelper();

    await userEvent.type(cpf, '11651232903{tab}');
    await userEvent.type(email, 'x@xcom{tab}');

    expect(button).toBeDisabled();
  });

  test('deve mostrar o feedback após click no botão continuar', async () => {
    const { cpf, email, button } = renderHelper();

    await userEvent.type(cpf, '11651232903{tab}');
    await userEvent.type(email, 'x@x.com{tab}');
    await waitFor(() => userEvent.click(button));

    expect(
      await screen.findByText(/Enviamos um e-mail para/i),
    ).toBeInTheDocument();
  });
});
