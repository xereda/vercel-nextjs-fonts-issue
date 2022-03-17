import { httpClient } from '@/utils/services';

export default async function handler(req, res) {
  try {
    const { accessToken, credential, idUsuario, idGrupoEmpresa } =
      req?.body || {};

    const headers = {
      authorization: `Bearer ${accessToken}`,
      client_id: process.env.HEIMDALL_CLIENT_ID,
      credential,
    };

    const url = process.env.PARAMETROS_PATH.replace(
      '[idGrupoEmpresa]',
      idGrupoEmpresa,
    ).replace('[idUsuario]', idUsuario);

    const response = await httpClient({ method: 'get', url, headers });

    const parametros = response?.data || {};

    if (!Object.keys(parametros || {}).length) {
      throw 'NO_PARAMETERS';
    }

    res.status(200).json(parametros);
  } catch (e) {
    console.error(e);
    const error = {
      status: 500,
      message: e?.response?.data?.messages?.[0] || e?.response?.data?.error,
    };

    if (e === 'NO_PARAMETERS') {
      error.message = 'Não há parâmetros para o grupo empresa';
    }

    if (!error.message) {
      error.message = 'Não foi obter a lista de parâmetros do grupo empresa';
    }

    res.status(error.status).json({ error: error.message });
  }
}
