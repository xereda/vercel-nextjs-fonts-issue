import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { dataNascimento, telefone, ddd, nomeMae } = req?.body || {};
      const { headers, idUsuario, usuario } = makeSessionHeaders(req);

      const responseUpdateUser = await httpClient({
        method: 'put',
        headers,
        url: `${process.env.ATUALIZACAO_DADOS_USUARIO_PATH}/${idUsuario}`,
        data: {
          ...usuario,
          dataNascimento,
          telefone,
          ddd,
          nomeMae,
          idUsuarioLogado: usuario.id,
        },
      });

      const atualizaDadosUsuario = responseUpdateUser?.data || {};

      res.status(200).json(atualizaDadosUsuario);
    } catch (e) {
      const error = getErrorMessage(e, 'Não foi possível atualizar os dados do usuário');
      res.status(error.status).json(error);
    }
  } else {
    try {
      const { accessToken, credential, cpf } = req?.body || {};
      const responseGetUserStatus = await httpClient({
        method: 'get',
        headers: {
          authorization: `Bearer ${accessToken}`,
          client_id: process.env.HEIMDALL_CLIENT_ID,
          credential,
        },
        url: process.env.DADOS_USUARIO_PATH,
        params: { cpf },
      });

      const userStatus = responseGetUserStatus?.data || {};

      if (userStatus.status === 'INATIVO') {
        throw new Error('O usuário está inativo. Por favor, entre em contato com o administrador da conta');
      }

      if (userStatus.anonimizado === true) {
        throw new Error('Usuário não existe');
      }

      res.status(200).json(userStatus);
    } catch (e) {
      const error = getErrorMessage(e, 'Não foi possível obter o status');
      res.status(error.status).json(error);
    }
  }
}