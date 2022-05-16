import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';
import { saveCookie } from '@/utils/saveCookie';

export default async function handler(req, res) {
  const { shouldSelectGroup } = req?.body || {};

  if (shouldSelectGroup) {
    try {
      const {
        headers,
        usuario,
        idUsuario,
        usuarioAceitouTermos,
        accessToken,
        publicKey,
      } = makeSessionHeaders(req);

      const { grupoEmpresa } = req?.body || {};

      const url = process.env.PARAMETROS_PATH.replace(
        '[idGrupoEmpresa]',
        grupoEmpresa.id,
      ).replace('[idUsuario]', idUsuario);

      const response = await httpClient({ method: 'get', url, headers });

      const parametros = response?.data || {};

      if (!Object.keys(parametros || {}).length) {
        throw new Error('Não há parâmetros para o grupo empresa selecionado');
      }

      await saveCookie({
        res,
        rawCookie: {
          usuario,
          grupoEmpresa,
          parametros,
          usuarioAceitouTermos,
          accessToken,
          publicKey,
        },
      });

      res.status(200).json(parametros);
    } catch (e) {
      console.error(e);
      const error = getErrorMessage(e, 'Não foi possível obter os parametros do grupo empresa selecionado');
      res.status(error.status).json(error);
    }
  } else {
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
        throw new Error('Não há parâmetros para o grupo empresa selecionado');
      }

      res.status(200).json(parametros);
    } catch (e) {
      console.error(e);
      const error = getErrorMessage(e, 'Não foi possível obter os parametros do grupo empresa selecionado');
      res.status(error.status).json(error);
    }
  }
}