import { rest } from 'msw';
import { dataMocks } from './data/index';

export const handlers = [
  rest.get('/api/dashboard', dataMocks.dashboard),
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ mockByPass: true }),
      ctx.delay(2000),
    );
  }),
  rest.put('/api/recuperar-senha', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }), ctx.delay());
  }),
  rest.put('/api/criar-senha', (req, res, ctx) => {
    if (!req.body.token) {
      return res(
        ctx.status(500),
        ctx.json({ error: 'Token não informado' }),
        ctx.delay(),
      );
    }

    return res(ctx.status(200), ctx.json({ success: true }), ctx.delay());
  }),
  rest.post('/api/permissoes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataMocks.gruposEmpresa), ctx.delay());
  }),
  rest.post('/api/parametros', (req, res, ctx) => {
    const currentCookie = req.cookies?.session || '{}';
    const currentCookieObject = JSON.parse(currentCookie);
    const newCookieObject = {
      ...currentCookieObject,
      grupoEmpresa: req.body?.grupoEmpresa || {},
    };
    const newCookie = JSON.stringify(newCookieObject);

    const cookie = req.body?.shouldSelectGroup ? newCookie : cookie;

    return res(
      ctx.status(200),
      ctx.json(dataMocks.parametros),
      ctx.delay(),
      ctx.cookie('session', cookie),
    );
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
  rest.post('/api/set-cookie', (req, res, ctx) => {
    return res(ctx.cookie('session', JSON.stringify(req.body || {})));
  }),
  rest.post('/api/clean-cookie', (req, res, ctx) => {
    return res(ctx.cookie('session', '{}'));
  }),
];
