import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import mock from '@/mocks/dashboard-mock';
import Dashboard from './Dashboard';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterEach(cleanup);
afterAll(() => server.close());

describe('Dashboard component', () => {

  test('deve renderizar o componente de loading inicialmente', () => {
    render(<Dashboard />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  test('deve renderizar o componente de erro', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });

  });

  test('deve renderizar o dashboard integrado com o mock', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mock));
      }),
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('1111')).toBeInTheDocument();
      expect(screen.getAllByText('Id do pedido')).toHaveLength(2);
    });

  });
});