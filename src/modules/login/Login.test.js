import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from '@/providers/';
import Login from './Login';

//jest.useFakeTimers();

beforeEach(() =>
  render(
    <Providers>
      <Login />
      <div id="myportal" />
    </Providers>,
  ),
);

afterEach(() => cleanup());

describe('Form login component', () => {
  test('deve apresentar o loading após informar um cpf válido, senha e pressionar o botão Fazer Login ', async () => {
    const cpf = screen.getByLabelText(/CPF/i);
    const password = screen.getByLabelText(/Senha/i);

    await userEvent.type(cpf, '11651232903{tab}');
    await userEvent.type(password, '1{tab}');

    expect(screen.queryByText(/cpf digitado não é valido/i)).toBeNull();
    expect(screen.queryAllByText(/campo obrigatório/i)).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Fazer login' })).toBeEnabled();
    const button = screen.getByRole('button', { name: 'Fazer login' });
    await userEvent.click(button);

    await waitFor(() => expect(screen.getByRole('Loading')).toBeEnabled());
  });
});
