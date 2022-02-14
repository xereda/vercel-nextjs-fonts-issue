import { render, screen } from '@testing-library/react';
import { Providers } from '@/providers/index';
import PaymentWarning from './PaymentWarning';

describe('PaymentWarning component', () => {
  test('deve renderizar a notificacao sobre boleto disponivel', () => {
    render((
      <Providers>
        <PaymentWarning />
      </Providers>
    ));

    expect(
      screen.getByRole('notice', { name: 'Boleto' }),
    ).toBeInTheDocument();
  });
});