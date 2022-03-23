import { getErrorMessage, httpClient } from '@/utils/services';

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
    const error = getErrorMessage(e, 'Não foi possível efetuar o login');

    res.status(error.status).json(error);
  }
}
