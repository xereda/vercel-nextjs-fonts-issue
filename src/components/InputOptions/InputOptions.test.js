import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputOptions from './InputOptions';

const handleInput = jest.fn();
const handleOption = jest.fn();

const renderSetup = () =>
  render(
    <InputOptions
      value="1158"
      placeholder="Buscar por"
      options={[
        { value: 'ID_PEDIDO', label: 'Id do pedido' },
        { value: 'ID_FATURA', label: 'Id da fatura', default: true },
        { value: 'CNPJ', label: 'Cnpj' },
      ]}
      onType={handleInput}
      onChangeOption={handleOption}
    />,
  );

describe('InputOptions Component', () => {
  test('deve renderizar o componente de input com as opções informadas', () => {
    const { getByText, getByRole, getByPlaceholderText } = renderSetup();

    const input = getByRole('textbox');
    const placeholder = getByPlaceholderText('Buscar por');

    expect(input).toBeEnabled();
    expect(input).toHaveValue('1158');
    expect(placeholder).toBeInTheDocument();
    expect(getByText('Id da fatura')).toBeInTheDocument();
  });

  test('deve renderizar as opções do input após o click no select', async () => {
    const { getAllByText, getByText, getByRole } = renderSetup();

    const select = getByRole('combobox');
    expect(select).toBeEnabled();

    await userEvent.click(select);

    await waitFor(() => {
      expect(getByText('Id do pedido')).toBeInTheDocument();
      expect(getAllByText('Id da fatura')).toHaveLength(2);
      expect(getByText('CNPJ')).toBeInTheDocument();
    });
  });
  test('deve repassar a opção selecionada como argumento de handleOption', async () => {
    const { getByText, getByRole } = renderSetup();

    const select = getByRole('combobox');
    await userEvent.click(select);

    const cnpj = getByText('Cnpj');
    await userEvent.click(cnpj);

    expect(handleOption).toHaveBeenCalledWith({
      label: 'Cnpj',
      value: 'CNPJ',
    });
  });

  test('deve invocar o callback handleInput repassando como argumento o texto digitado', async () => {
    const { getByRole } = renderSetup();

    const input = getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '9999{tab}');

    await waitFor(() => {
      expect(input).toHaveValue('9999');
      expect(handleInput).toHaveBeenCalledWith('9999');
    });
  });
});
