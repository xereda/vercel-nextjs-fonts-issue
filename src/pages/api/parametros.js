import { httpClient } from '@/utils/services';

export default async function handler(req, res) {
  try {
    const cookieRaw = req?.headers?.session || req?.cookies?.session || '{}';

    const session = JSON.parse(cookieRaw);

    const accessToken = session?.accessToken;
    const credential = session?.credential;
    const client_id = process.env.HEIMDALL_CLIENT_ID;
    const idGrupoEmpresa = session?.grupoEmpresa?.id;
    const idUsuario = session?.usuario?.id;

    if (!accessToken || !credential || !idGrupoEmpresa || !idUsuario) {
      throw 'INVALID_DATA_SESSION';
    }

    const headers = {
      authorization: `Bearer ${accessToken}`,
      client_id,
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

    if (e === 'INVALID_DATA_SESSION') {
      error.message = 'Não foi possível obter os dados da sessão (sem cookie)';
    }

    if (e === 'NO_PARAMETERS') {
      error.message = 'Não há parâmetros para o grupo empresa';
    }

    if (!error.message) {
      error.message = 'Não foi obter a lista de parâmetros do grupo empresa';
    }

    res.status(error.status).json({ error: error.message });
  }
}
