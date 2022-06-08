import { render, screen, waitFor } from '@testing-library/react';
import { format, subDays, subWeeks } from 'date-fns';
import userEvent from '@testing-library/user-event';
import FilterOrderDate from './FilterOrderDate';

const formatDate = (date) => format(date, 'yyyy-MM-dd');
const onChange = jest.fn();
const onChangeDates = jest.fn();

describe('Filter by order date component', () => {
  test('deve renderizar o dropdown com todas as opções de filtro', async () => {
    render(
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption=""
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

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
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption="today"
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Hoje')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.queryByText('Todas')).not.toBeInTheDocument();
    });
  });

  test('deve executar o método informado via prop onChange', async () => {
    render(
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption=""
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Hoje');
    await userEvent.click(filterOption);

    expect(onChange).toHaveBeenCalledWith('today');
  });

  test('deve retornar o range de datas para o filtro Hoje', async () => {
    render(
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption=""
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

    const today = formatDate(new Date());

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Hoje');
    await userEvent.click(filterOption);

    expect(onChangeDates).toHaveBeenCalledWith({
      startDate: today,
      endDate: today,
    });
  });

  test('deve retornar o range de datas para o filtro Ontem', async () => {
    render(
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption=""
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

    const today = formatDate(new Date());
    const yesterday = formatDate(subDays(new Date(), 1));

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('Ontem');
    await userEvent.click(filterOption);

    expect(onChangeDates).toHaveBeenCalledWith({
      startDate: yesterday,
      endDate: today,
    });
  });

  test('deve retornar datas em intervalo de 7 dias no filtro 7 dias', async () => {
    render(
      <FilterOrderDate
        startDate=""
        endDate=""
        selectedOption=""
        onChange={onChange}
        onChangeDates={onChangeDates}
      />,
    );

    const today = formatDate(new Date());
    const oneWeek = formatDate(subWeeks(new Date(), 1));

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);

    const filterOption = screen.getByText('7 dias');
    await userEvent.click(filterOption);

    expect(onChangeDates).toHaveBeenCalledWith({
      startDate: oneWeek,
      endDate: today,
    });
  });
});
