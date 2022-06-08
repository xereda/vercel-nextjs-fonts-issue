import { act, render, screen, waitFor } from '@testing-library/react';
import ToastContainer, { toast } from './ToastContainer';

describe('Toaster Component', () => {
  test('deve apresentar a notificação via toast e sumir após 1 segundo', async () => {
    render(<ToastContainer />);

    act(() => toast({ message: 'mensagem', timeout: 1000 }));

    expect(await screen.findByText('mensagem')).toBeInTheDocument();

    await waitFor(
      () => expect(screen.queryByText('mensagem')).not.toBeInTheDocument(),
      { timeout: 1100 },
    );
  });
});
