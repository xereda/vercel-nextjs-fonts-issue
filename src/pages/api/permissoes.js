import { httpClient } from '@/utils/services';

export default async function handler(req, res) {
  try {
    console.log('req.body: ', req?.body);

    const { accessToken, credential, idUsuario } = req?.body || {};

    const headers = {
      authorization: `Bearer ${accessToken}`,
      client_id: process.env.HEIMDALL_CLIENT_ID,
      credential,
    };
    const url = `${process.env.PERMISSOES_PATH}?idUsuario=${idUsuario}&statusDescricao=ATIVO`;

    const response = await httpClient({ method: 'get', url, headers });

    const grupoEmpresa = response?.data?.content?.[0].grupoEmpresa || {};

    res.status(200).json(grupoEmpresa);
  } catch (e) {
    console.error(e);

    const error =
      e?.response?.data?.messages?.[0] ||
      e?.response?.data?.error ||
      'Não foi possível obter a relação de grupos empresas do usuário';
    const status = e?.response?.status || 500;

    res.status(status).json({ error });
  }
}
