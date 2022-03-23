import { render, screen } from '@testing-library/react';
import PaymentWarning from './PaymentWarning';

describe('PaymentWarning component', () => {
  test('deve renderizar a notificacao sobre boleto disponivel', () => {
    render(<PaymentWarning />);

    expect(screen.getByRole('notice', { name: 'Boleto' })).toBeInTheDocument();
  });
});
