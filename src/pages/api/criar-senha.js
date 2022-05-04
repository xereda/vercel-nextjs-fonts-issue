import { getErrorMessage, httpClient } from '@/utils/services';
import { getTempSessionData } from '@/utils/session';

export default async function handler(req, res) {
  try {
    const headers = await getTempSessionData();

    const { novaSenha, token } = req?.body || {};

    if (!token) {
      throw new Error('Token não informado');
    }

    await httpClient({
      method: 'put',
      url: `${process.env.ALTERACAO_SENHA_PATH}/${token}`,
      data: { novaSenha },
      headers,
    });

    res.status(200).json({ success: true });
  } catch (e) {
    const error = getErrorMessage(e, 'Não foi possível alterar a senha');

    res.status(error.status).json(error);
  }
}
