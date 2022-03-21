import { httpClient } from '@/utils/services';

export default async function handler(req, res) {
  try {
    const { apiKey, authorization } = req?.body || {};
    const headers = {
      apiKey,
      authorization,
      client_id: process.env.HEIMDALL_CLIENT_ID,
    };

    const response = await httpClient({
      method: 'post',
      url: process.env.AUTHENTICATION_PATH,
      headers,
    });

    res.status(200).json(response?.data || {});
  } catch (e) {
    const message =
      e?.response?.data?.messages?.[0] || 'Não foi possível efetuar o login';
    const status = e?.response?.status || 500;

    const error =
      status === 401
        ? 'Seu CPF e/ou senha não foram identificados. Verifique se eles foram preenchidos corretamente'
        : message;

    res.status(status).json({ error });
  }
}
