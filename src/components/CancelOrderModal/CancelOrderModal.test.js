import { fireEvent, render, screen } from '@testing-library/react';
import CancelOrderModal from './CancelOrderModal';

const handleCloseModal = jest.fn(() => true);

beforeEach(() => {
  render(<CancelOrderModal {...{ handleCloseModal }} />);
});

describe('CancelOrderModal component', () => {
  test('deve renderizar o modal', async () => {
    expect(screen.getByText(/deseja cancelar o pedido/i)).toBeInTheDocument();
  });

  test('deve executar a funcao quando o botao Sair for clicado', async () => {
    const buttonExit = screen.queryByText('Sair');

    fireEvent.click(buttonExit);

    expect(handleCloseModal).toHaveBeenCalled();
  });

});
