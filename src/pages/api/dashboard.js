import { httpClient } from '@/utils/services';
import { getSessionFromCookie } from '@/utils/session';
import { transformOrders } from '@/transform/order';
import { formatMoney } from '@/utils/format';
// import Krypton from '@/utils/krypton';

export default async function handler(req, res) {
  try {
    const {
      accessToken,
      client_id,
      idGrupoEmpresa,
      idUsuario,
      isInvalidSession,
    } = getSessionFromCookie(req);

    // const krypton = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);

    // const publicKey = krypton.formatPublicKey(
    //   process.env.NEXT_PUBLIC_KRYPTON_KEY,
    // );

    const timestamp = new Date().getTime();

    // const credential = await krypton.generateHash(publicKey, timestamp);

    if (isInvalidSession) {
      throw 'INVALID_DATA_SESSION';
    }

    const headers = {
      authorization: `Bearer ${accessToken}`,
      client_id,
    };

    const params = {
      idUsuario,
      idGrupoEmpresa,
      paginaAtual: 1,
      tamanhoPagina: 10,
    };

    const responseOrders = await httpClient({
      method: 'get',
      url: process.env.RESUMO_PEDIDOS_PATH,
      headers,
      params,
    });

    const orders = transformOrders(responseOrders?.data?.pedidos || []);

    const urlVirualBalance = process.env.SALDO_CONTA_VIRTUAL_PATH.replace(
      '[idGrupoEmpresa]',
      idGrupoEmpresa,
    );

    console.log({
      urlVirualBalance,
      headers,
      idUsuario,
      idGrupoEmpresa,
      timestamp,
    });

    const responseVirtualBalance = await httpClient({
      method: 'get',
      url: urlVirualBalance,
      headers,
      params: { idUsuario, idGrupoEmpresa },
    });

    const virtualBalance = {
      balanceValue: formatMoney(responseVirtualBalance?.data?.saldo),
    };

    console.log(responseVirtualBalance);

    res.status(200).json({ orders, virtualBalance });
  } catch (e) {
    console.error(e);

    const error = {
      status: 500,
      message: e?.response?.data?.messages?.[0] || e?.response?.data?.error,
    };

    if (e === 'INVALID_DATA_SESSION') {
      error.message = 'Não foi possível obter os dados da sessão (sem cookie)';
    }

    if (!error.message) {
      error.message = 'Não foi obter a lista de pedidos';
    }

    res.status(error.status).json({ error: error.message });
  }
}
