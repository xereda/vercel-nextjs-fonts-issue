import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

beforeEach(() => render(<Form withRecaptcha={false} />));

afterEach(() => cleanup());

describe('Form login component', () => {
  test('deve iniciar o formulario com o botao "fazer login" desabilitado', () => {

    expect(screen.getByText('fazer login', { exact: false })).toBeDisabled();
  });

  test('deve aplicar a mascara para um cpf digitado ', async () => {
    const cpf = screen.getByLabelText(/CPF/i);
    await userEvent.type(cpf, '11651232903{tab}');

    await waitFor(() => expect(cpf).toHaveValue('116.512.329-03'));
  });

  test('deve apresentar mensagem de erro ao informar um cpf invalido', async () => {
    const cpf = screen.getByLabelText(/CPF/i);
    await userEvent.type(cpf, '11111111111{tab}');

    expect(screen.getByText('O CPF digitado não é valido.')).toBeInTheDocument();
    expect(screen.getByText('fazer login', { exact: false })).toBeDisabled();
  });

  test('deve apresentar mensagem de campo requerido quando os campos não forem informados', async () => {
    const cpf = screen.getByLabelText(/CPF/i);
    const password = screen.getByLabelText(/Senha/i);

    await userEvent.type(cpf, '1{tab}');
    await userEvent.type(password, '1{tab}');
    await userEvent.clear(cpf);
    await userEvent.clear(password);

    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(2);
    expect(screen.getByText('fazer login', { exact: false })).toBeDisabled();
  });

  test('deve habilitar o botao quando cpf e senha informados corretamente', async () => {
    const cpf = screen.getByLabelText(/CPF/i);
    const password = screen.getByLabelText(/Senha/i);

    await userEvent.type(cpf, '11651232903{tab}');
    await userEvent.type(password, '1{tab}');

    expect(screen.queryByText(/cpf digitado não é valido/i)).toBeNull();
    expect(screen.queryAllByText(/campo obrigatório/i)).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Fazer login' })).toBeEnabled();
  });

  test.only('renderiza e submete o formulário formik', () => {
    const cpf = screen.getByLabelText(/CPF/i);
    const password = screen.getByLabelText(/Senha/i);
    const handleSubmit = jest.fn();

    render(<Form onSubmit={handleSubmit} />);
    userEvent.type(cpf, '123.456.789.12');
    userEvent.type(password, '123');

    waitFor(() => {

      screen.getByRole('button', { name: /Fazer login/i });
    });

    waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        cpf: '999',
        password: '999',
      }),
    );
  });
});