import { rest } from 'msw';
import { dataMocks } from './data/index';

export const handlers = [
  rest.get('/api/dashboard', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.dashboard), ctx.delay());
  }),
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ mockByPass: true }),
      ctx.delay(2500),
    );
  }),
  rest.post('/api/permissoes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.grupoEmpresa), ctx.delay());
  }),
];
