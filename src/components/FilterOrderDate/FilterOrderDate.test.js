import { render, screen, waitFor } from '@testing-library/react';
import { format, subDays, subWeeks } from 'date-fns';
import userEvent from '@testing-library/user-event';
import FilterOrderDate from './FilterOrderDate';

const formatDate = (date) => format(date, 'yyyy-MM-dd');
const onClickFilter = jest.fn(() => true);

describe('Filter by order date component', () => {
  test('deve renderizar o dropdown com todas as opções de filtro', async () => {
    render(<FilterOrderDate onClickFilter={onClickFilter} status="" />);

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Hoje')).toBeInTheDocument();
      expect(screen.getByText('Ontem')).toBeInTheDocument();
      expect(screen.getByText('7 dias')).toBeInTheDocument();
    });
  });

  test('deve renderizar apenas label sem dinamica de dropdown', async () => {
    render(
      <FilterOrderDate onClickFilter={onClickFilter} status="Hoje" />,
    );

    await waitFor(() => {
      expect(screen.getByText('Hoje')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.queryByText('Todas')).not.toBeInTheDocument();
    });
  });

  test('deve executar a função callback no click do filtro', async () => {
    render(<FilterOrderDate onClickFilter={onClickFilter} status="" />);

    const today = formatDate(new Date());

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Hoje');
    await userEvent.click(filterOption);

    expect(onClickFilter).toHaveBeenCalledWith(today);
  });

  test('deve retornar a data de ontem no filtro Ontem', async () => {
    render(<FilterOrderDate onClickFilter={onClickFilter} status="" />);

    const yesterday = formatDate(subDays(new Date(), 1));

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Ontem');
    await userEvent.click(filterOption);

    expect(onClickFilter).toHaveBeenCalledWith(yesterday);
  });

  test('deve retornar datas em intervalo de 7 dias no filtro 7 dias', async () => {
    render(<FilterOrderDate onClickFilter={onClickFilter} status="" />);

    const oneWeek = formatDate(subWeeks(new Date(), 1));

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('7 dias');
    await userEvent.click(filterOption);

    expect(onClickFilter).toHaveBeenCalledWith(oneWeek);
  });
});