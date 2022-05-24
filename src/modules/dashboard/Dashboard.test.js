import React from 'react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import RenderWithoutSWRCache from '@/mocks/RenderWithouCache';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import Dashboard from './Dashboard';

describe('Dashboard component', () => {
  test('should render dashboard integrated with mock', async () => {
    render(<Dashboard />);

    expect(screen.getByRole('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/10882/)).toBeInTheDocument();
      expect(screen.getAllByText('Status do pedido')).toHaveLength(
        DASHBOARD_TOTAL_ORDERS_PER_PAGE,
      );
    });
  });

  test('should render error component', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });
  });

  test('should render no data component', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('no data')).toBeInTheDocument();
    });
  });
});
