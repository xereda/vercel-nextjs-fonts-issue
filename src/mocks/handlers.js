import { rest } from 'msw';
import { dataMocks } from './data/index';

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ mockByPass: true }),
      ctx.delay(2000),
    );
  }),
  rest.post('/api/criar-senha', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }), ctx.delay());
  }),
  rest.get('/api/dashboard', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.dashboard), ctx.delay());
  }),
  rest.post('/api/permissoes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.grupoEmpresa), ctx.delay());
  }),
  rest.post('/api/parametros', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.parametros), ctx.delay());
  }),
  rest.post('/api/aceite-termos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(req.body.shouldPersist ? dataMocks.aceiteTermos : false),
      ctx.delay(),
    );
  }),
  rest.post('/api/user-status', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dataMocks.session.usuario),
      ctx.delay(),
    );
  }),
  rest.put('/api/user-status', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dataMocks.session.usuario),
      ctx.delay(),
    );
  }),
  rest.get('/api/clean-cookie', (req, res, ctx) => {
    return res(ctx.cookie('session', '{}'));
  }),
];
