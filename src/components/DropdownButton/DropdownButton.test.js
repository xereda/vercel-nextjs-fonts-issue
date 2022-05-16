import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownButton from './DropdownButton';

describe('DropdownButton', () => {
  test('deve renderizar o componente pronto para a dinâmica do dropdown', async () => {
    const callback = jest.fn();
    const { getByText, getByRole, findByText } = render(
      <DropdownButton
        label="status label"
        hasAction
        handleAction={callback}
        labelAction="label action"
      />,
    );

    const dropDownTrigger = getByRole('button', { name: 'status label down' });

    expect(getByText('status label')).toBeInTheDocument();
    expect(dropDownTrigger).toBeInTheDocument();
    expect(dropDownTrigger).toBeEnabled();

    userEvent.click(dropDownTrigger);

    const actionButton = await findByText('label action');
    expect(actionButton).toBeInTheDocument();

    await waitFor(async () => {
      userEvent.click(actionButton);
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });

  test('deve renderizar apenas o label, SEM a dinâmica do dropdown', async () => {
    const { getByText, queryByRole, queryByText } = render(
      <DropdownButton label="status label" labelAction="label action" />,
    );

    expect(getByText('status label')).toBeInTheDocument();

    const dropDownTrigger = queryByRole('button', {
      name: 'status label down',
    });
    expect(dropDownTrigger).not.toBeInTheDocument();

    await waitFor(() =>
      expect(queryByText('label action')).not.toBeInTheDocument(),
    );
  });
});
