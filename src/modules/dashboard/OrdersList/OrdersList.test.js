import { render, screen } from '@testing-library/react';
import mock from '@/mocks/dashboard-mock';
import { Providers } from '@/providers/index';
import OrdersList from './OrdersList';

const { orders } = mock;

describe('OrdersList component', () => {
  test('deve renderizar a lista de pedidos informada via prop', () => {
    render((
      <Providers>
        <OrdersList orders={orders} />
      </Providers>
    ));

    expect(screen.getAllByText('Id do pedido')).toHaveLength(2);
    expect(screen.getByText(/1111/)).toBeInTheDocument();
    expect(screen.getByText(/2222/)).toBeInTheDocument();
  });
});