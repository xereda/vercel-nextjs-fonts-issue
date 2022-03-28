import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';

export default async function handler(req, res) {
  const { shouldPersist } = req?.body || {};

  if (shouldPersist) {
    try {
      const { headers, cpf } = makeSessionHeaders(req);
      const responsePostUserStatusTerm = await httpClient({
        method: 'post',
        headers,
        url: `${process.env.ACEITE_TERMOS_PATH}`,
        data: { cpf, aceite: true, idCanalAtendimento: 4 },
      });

      const postAceiteTermosStatus = responsePostUserStatusTerm?.data || {};

      res.status(200).json(postAceiteTermosStatus);
    } catch (e) {
      const error = getErrorMessage(e, 'Não foi possível atualizar o status do termo');
      res.status(error.status).json(error);
    }
  } else {
    try {
      const { accessToken, credential, cpf } = req?.body || {};
      const responseGetUserStatusTerm = await httpClient({
        method: 'get',
        headers: {
          authorization: `Bearer ${accessToken}`,
          client_id: process.env.HEIMDALL_CLIENT_ID,
          credential,
        },
        url: `${process.env.ACEITE_TERMOS_PATH}`,
        params: { cpf },
      });

      const getAceiteTermosStatus =
        responseGetUserStatusTerm?.status === 204 ? false : true;

      res.status(200).json(getAceiteTermosStatus);
    } catch (e) {
      const error = getErrorMessage(e, 'Não foi possível obter o status do termo');
      res.status(error.status).json(error);
    }
  }
}