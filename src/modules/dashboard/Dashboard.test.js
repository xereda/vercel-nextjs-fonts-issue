import React from 'react';
import timekeeper from 'timekeeper';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithoutSWRCache from '@/mocks/RenderWithouCache';
import { getOrdersFromPage, totalOrders } from '@/mocks/data/dashboard';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import Dashboard from './Dashboard';

describe('Dashboard component', () => {
  test('deve renderizar o dashboard integrado com o mock (MSW)', async () => {
    render(<Dashboard />);

    expect(screen.getByRole('Loading')).toBeInTheDocument();

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

    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    expect(await screen.findByText('error')).toBeInTheDocument();
  });

  test('deve renderizar o componente placeholder para o status no-data', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      }),
    );

    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    expect(await screen.findByText('no data')).toBeInTheDocument();
  });

  test('deve filtrar os pedidos conforme status selecionado', async () => {
    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    const filterStatus = screen.getByText('Todos');
    await userEvent.click(filterStatus);
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
    timekeeper.freeze(new Date('2022-05-24'));

    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    const filterDate = screen.getByText('Todas');
    await userEvent.click(filterDate);
    const today = await screen.findByText('Hoje');
    await userEvent.click(today);

    expect(await screen.findByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('12967')).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(1);

    timekeeper.reset();
  });

  test('deve filtrar os pedidos conforme id do pedido', async () => {
    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    const filterOrderId = screen.getByPlaceholderText('Buscar por');
    await userEvent.type(filterOrderId, '10882');

    expect(await screen.findByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('10882')).toBeInTheDocument();
    expect(screen.getAllByText('Status do pedido')).toHaveLength(1);
  });

  test('deve possibilitar a paginação correta conforme total de pedidos', async () => {
    render(
      <RenderWithoutSWRCache>
        <Dashboard />
      </RenderWithoutSWRCache>,
    );

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('Loading')).not.toBeInTheDocument();
    });

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
});
