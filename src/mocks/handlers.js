import { rest } from 'msw';
import mock from './dashboard-mock';

export const handlers = [
  rest.get('/api/dashboard', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock));
  }),
];