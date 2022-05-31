import { render, screen } from '@testing-library/react';
import LimitChart from './LimitChart';

describe('LimitChart component', () => {
  test('deve renderizar com os valores default zerados', () => {
    render(<LimitChart />);

    expect(screen.queryByText('0%')).toBeInTheDocument();
    expect(screen.queryAllByText('R$ 0,00')).toHaveLength(3);
  });

  test('deve renderizar com os valores informados atraves das props', () => {
    render(
      <LimitChart
        percentage={99}
        limiteBalance="R$ 1,00"
        usedLimit="R$ 99,00"
        totalLimit="R$ 100,00"
      />,
    );

    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('R$ 1,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });

  test('deve renderizar o email de contato caso o percentual seja 100%', () => {
    render(
      <LimitChart
        percentage={100}
        limiteBalance="R$ 0,00"
        usedLimit="R$ 100,00"
        totalLimit="R$ 100,00"
      />,
    );

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
    expect(screen.getByText(/entre em contato com/)).toBeInTheDocument();
  });
});
