import { render, screen, fireEvent } from '@testing-library/react';
import CancelOrderModal from './CancelOrderModal';

const handleContinue = jest.fn(() => true);
const handleCloseModal = jest.fn(() => true);

beforeEach(() => {
  render(<CancelOrderModal {...{ handleContinue, handleCloseModal }} />);
});

describe('CancelOrderModal component', () => {
  test('deve renderizar o modal', async () => {
    expect(screen.getByText(/deseja cancelar o pedido/i)).toBeInTheDocument();
  });

  test('deve executar a funcao quando o botao Continuar for clicado', async () => {
    const buttonContinue = screen.queryByText('Continuar');

    fireEvent.click(buttonContinue);

    expect(handleContinue).toHaveBeenCalled();
  });

  test('deve executar a funcao quando o botao Sair for clicado', async () => {
    const buttonContinue = screen.queryByText('Sair');

    fireEvent.click(buttonContinue);

    expect(handleContinue).toHaveBeenCalled();
  });

});
