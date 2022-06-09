import React from 'react';
import timekeeper from 'timekeeper';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithoutSWRCache from '@/mocks/RenderWithouCache';
import { getOrdersFromPage, totalOrders } from '@/mocks/handlers/dashboard';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { toastState } from '@/components/Toast/useToast';
import Dashboard from './Dashboard';

const setupTest = async () => {
  render(
    <RenderWithoutSWRCache>
      <Dashboard />
    </RenderWithoutSWRCache>,
  );

  expect(screen.getByRole('Loading')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
  });
};

const resetFilterStatus = async () => {
  const filterStatus = await screen.findAllByText('Aguardando confirmação');
  await userEvent.click(filterStatus[0]);
  const statusTodos = await screen.findByText('Todos');
  await userEvent.click(statusTodos);
};

describe('Dashboard component', () => {
  test('deve renderizar o dashboard integrado com o mock (MSW)', async () => {
    await setupTest();

    await resetFilterStatus();

    await waitFor(() => {
      expect(screen.getByText(/10882/)).toBeInTheDocument();
      expect(screen.getAllByText('Status do pedido')).toHaveLength(
        DASHBOARD_TOTAL_ORDERS_PER_PAGE,
      );
    });
  });

  test('deve renderizar o placeholder de erro', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' }),
        );
      }),
    );

    await setupTest();

    expect(await screen.findByText('error')).toBeInTheDocument();
  });

  test('deve renderizar o componente placeholder para o status no-data', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      }),
    );

    await setupTest();

    expect(await screen.findByText('no data')).toBeInTheDocument();
  });

  test('deve filtrar os pedidos conforme status selecionado', async () => {
    await setupTest();

    const filterStatus = await screen.findAllByText('Aguardando confirmação');
    await userEvent.click(filterStatus[0]);
    const statusInvalidado = await screen.findByText('Invalidado');
    await userEvent.click(statusInvalidado);

    expect(await screen.findByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(await screen.findByText('6400')).toBeInTheDocument();
    expect(screen.getByText('6401')).toBeInTheDocument();
    expect(screen.getByText('6402')).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(3);
  });

  test('deve filtrar os pedidos conforme data selecionada', async () => {
    timekeeper.freeze(new Date('2022-05-24T12:00:00'));

    await setupTest();

    await resetFilterStatus();

    const filterDate = await screen.findByText('Todas');
    await userEvent.click(filterDate);
    const today = await screen.findByText('Hoje');
    await userEvent.click(today);

    expect(await screen.findByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(await screen.findByText('12967')).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(1);

    timekeeper.reset();
  });

  test('deve filtrar os pedidos conforme id do pedido', async () => {
    await setupTest();

    await resetFilterStatus();

    const filterOrderId = screen.getByPlaceholderText('Buscar por');
    await userEvent.type(filterOrderId, '10882{tab}');

    await waitFor(async () => {
      expect(await screen.findByRole('Loading')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('10882')).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(1);
  });

  test('deve possibilitar a paginação correta conforme total de pedidos', async () => {
    await setupTest();

    await resetFilterStatus();

    const lastPage = Math.ceil(totalOrders / DASHBOARD_TOTAL_ORDERS_PER_PAGE);
    const ordersLastPage = getOrdersFromPage(lastPage);

    const linkToLastPage = screen.getByRole('listitem', { name: lastPage });
    expect(linkToLastPage).toBeInTheDocument();
    await userEvent.click(linkToLastPage);

    expect(await screen.findByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText(ordersLastPage[0].orderId)).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(
      ordersLastPage.length,
    );
  });

  test('deve apresentar o toast informando que há um pedido aguardando confirmação', async () => {
    await toastState().merge({ timeout: 1000 });

    await setupTest();

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText(/O pedido 19405 está aguardando/),
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      },
      { timeout: 1200 },
    );
  });

  test('deve apresentar o toast informando que há mais de um pedido aguardando confirmação', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            useLimit: {
              percentage: 51,
              limiteBalance: 'R$ 9,00',
              usedLimit: 'R$ 1,00',
              totalLimit: 'R$ 10,00',
            },
            virtualBalance: {
              balanceValue: 'R$ 1,00',
            },
            totalItems: 2,
            orders: [
              {
                orderId: '111111',
                date: '08/06/2022 - 04:18:18',
                value: 'R$ 340,00',
                canCancel: true,
                status: {
                  enum: 'AGUARDANDO_CONFIRMACAO',
                  label: 'Aguardando confirmação',
                  color: '--bds-color-black-lighter',
                },
                paymentStatus: {
                  enum: 'FATURA_EM_ABERTO',
                  label: 'Fatura em aberto',
                  color: '--bds-color-yellow-dark',
                },
              },
              {
                orderId: '222222',
                date: '08/06/2022 - 05:35:05',
                value: 'R$798,50',
                canCancel: true,
                status: {
                  enum: 'AGUARDANDO_CONFIRMACAO',
                  label: 'Aguardando confirmação',
                  color: '--bds-color-black-lighter',
                },
                paymentStatus: {
                  enum: 'FATURA_EM_ABERTO',
                  label: 'Fatura em aberto',
                  color: '--bds-color-yellow-dark',
                },
              },
            ],
            waitingConfirmationOrders: ['111111', '222222'],
          }),
        );
      }),
    );

    await toastState().merge({ timeout: 1000 });

    await setupTest();

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText(/O pedido 111111 e outros estão aguardando/),
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      },
      { timeout: 1200 },
    );
  });
});
