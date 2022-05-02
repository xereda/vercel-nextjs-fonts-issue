import { getErrorMessage, httpClient } from '@/utils/services';
import { getTempSessionData } from '@/utils/session';

export default async function handler(req, res) {
  try {
    const headers = await getTempSessionData();
    const { cpf, email, plataforma } = req?.body || {};

    await httpClient({
      method: 'put',
      headers,
      url: `${process.env.ALTERACAO_SENHA_PATH}`,
      params: { operacao: 'esqueci-senha' },
      data: { cpf, email, plataforma },
    });

    res.status(200).json({ success: true });
  } catch (e) {
    const error = getErrorMessage(e, 'Não foi possível recuperar a senha');
    res.status(error.status).json(error);
  }

}