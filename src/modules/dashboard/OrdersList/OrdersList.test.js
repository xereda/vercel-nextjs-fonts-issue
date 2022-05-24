import { render, screen } from '@testing-library/react';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { orders } from '@/mocks/data/dashboard';
import OrdersList from './OrdersList';

describe('OrdersList component', () => {
  test('deve renderizar a lista de pedidos informada via prop', () => {
    render(<OrdersList orders={orders} />);

    expect(screen.getAllByText('Id do pedido')).toHaveLength(
      DASHBOARD_TOTAL_ORDERS_PER_PAGE,
    );
    expect(screen.getByText(/10882/)).toBeInTheDocument();
    expect(screen.getByText(/10881/)).toBeInTheDocument();
  });
});
