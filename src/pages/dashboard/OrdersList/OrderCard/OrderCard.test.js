import { render, screen } from '@testing-library/react';
import mock from '@/mocks/dashboard-mock';
import OrderCard from './OrderCard';

const { orders } = mock;
const order = orders[0];

describe('OrderCard', () => {
  test('deve renderizar o card com os valores informados via prop', () => {
    render(<OrderCard order={order} />);

    expect(screen.getByText(order.orderId)).toBeInTheDocument();
    expect(screen.getByText(order.date)).toBeInTheDocument();
    expect(screen.getByText(order.value)).toBeInTheDocument();
    expect(screen.getByText(order.status.label)).toBeInTheDocument();
    expect(screen.getByText(order.paymentStatus.label)).toBeInTheDocument();
  });
});