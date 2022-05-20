import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterOrderStatus from './FilterOrderStatus';

const onClickFilter = jest.fn(() => true);

describe('Filter by order status component', () => {
  test('deve renderizar o dropdown com todas as opções de filtro', async () => {
    render(<FilterOrderStatus onClickFilter={onClickFilter} status="" />);

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Validando arquivo')).toBeInTheDocument();
      expect(screen.getByText('Processando')).toBeInTheDocument();
      expect(screen.getByText('Aguardando confirmação')).toBeInTheDocument();
      expect(screen.getByText('Concluído')).toBeInTheDocument();
      expect(screen.getByText('Invalidado')).toBeInTheDocument();
      expect(screen.getByText('Cancelado')).toBeInTheDocument();
      expect(screen.getByText('Cancelado parcial')).toBeInTheDocument();
    });
  });

  test('deve renderizar apenas label sem dinamica de dropdown', async () => {
    render(
      <FilterOrderStatus onClickFilter={onClickFilter} status="CANCELADO" />,
    );

    await waitFor(() => {
      expect(screen.getByText('Cancelado')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.queryByText('Todos')).not.toBeInTheDocument();
    });
  });

  test('deve executar a função callback no click do filtro', async () => {
    render(<FilterOrderStatus onClickFilter={onClickFilter} status="" />);

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Validando arquivo');
    await userEvent.click(filterOption);

    expect(onClickFilter).toHaveBeenCalledWith('VALIDANDO_ARQUIVO');
  });
});
