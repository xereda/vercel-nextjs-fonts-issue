import { render, waitFor } from '@testing-library/react';
import OrderCard from './OrderCard';

const order = {
  orderId: '10882',
  date: '15/03/2022 - 03:42:02',
  value: 'R$ 910,00',
  canCancel: false,
  status: { enum: 'CONCLUIDO', label: 'Concluído', color: '--bds-color-green' },
  paymentStatus: {
    enum: 'AGUARDANDO_PAGAMENTO',
    label: 'Aguardando',
    color: '--bds-color-yellow-dark',
  },
};

describe('OrderCard', () => {
  test('deve renderizar o card com os valores informados via prop', async () => {
    const { getByText } = render(<OrderCard order={order} />);

    await waitFor(() => {
      expect(getByText(order.orderId)).toBeInTheDocument();
      expect(getByText(order.date)).toBeInTheDocument();
      expect(getByText(order.value)).toBeInTheDocument();
      expect(getByText(order.status.label)).toBeInTheDocument();
      expect(getByText(order.paymentStatus.label)).toBeInTheDocument();
    });
  });
});
