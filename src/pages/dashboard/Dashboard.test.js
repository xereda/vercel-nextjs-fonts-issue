import React from 'react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { render, screen, waitFor } from '@testing-library/react';
import RenderWithoutSWRCache from '@/mocks/RenderWithouCache';
import { Providers } from '@/providers/index';
import Dashboard from './Dashboard.page';

describe('Dashboard component', () => {
  test('should render dashboard integrated with mock', async () => {
    render((
      <Providers>
        <Dashboard />
      </Providers>
    ));

    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/1111/)).toBeInTheDocument();
      expect(screen.getAllByText('Id do pedido')).toHaveLength(2);
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
        <Providers>
          <Dashboard />
        </Providers>
      </RenderWithoutSWRCache>);

    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });

  });

  test('should render no data component', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({}),
        );
      }),
    );

    render(
      <RenderWithoutSWRCache>
        <Providers>
          <Dashboard />
        </Providers>
      </RenderWithoutSWRCache>);

    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('no data')).toBeInTheDocument();
    });

  });
});