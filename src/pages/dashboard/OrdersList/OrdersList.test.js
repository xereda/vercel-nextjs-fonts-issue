import { render, screen } from '@testing-library/react';
import mock from '@/mocks/dashboard-mock';
import OrdersList from './OrdersList';

const { orders } = mock;

describe('OrdersList component', () => {
  test('deve renderizar a lista de pedidos informada via prop', () => {
    render(<OrdersList orders={orders} />);

    expect(screen.getAllByText('Id do pedido')).toHaveLength(2);
    expect(screen.getByText(orders[0].orderId)).toBeInTheDocument();
    expect(screen.getByText(orders[1].orderId)).toBeInTheDocument();
  });
});