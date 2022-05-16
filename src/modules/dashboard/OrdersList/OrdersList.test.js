import { render, screen } from '@testing-library/react';
import mock from '@/mocks/data/dashboard';
import OrdersList from './OrdersList';

const { orders } = mock;

describe('OrdersList component', () => {
  test('deve renderizar a lista de pedidos informada via prop', () => {
    render(<OrdersList orders={orders} />);

    expect(screen.getAllByText('Id do pedido')).toHaveLength(4);
    expect(screen.getByText(/1111/)).toBeInTheDocument();
    expect(screen.getByText(/2222/)).toBeInTheDocument();
    expect(screen.getByText(/3333/)).toBeInTheDocument();
    expect(screen.getByText(/0957/)).toBeInTheDocument();
  });
});
