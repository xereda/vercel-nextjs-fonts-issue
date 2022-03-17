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

    // ?idUsuario=1952156&idGrupoEmpresa=630587&statusPedido=AGUARDANDO_CONFIRMACAO&paginaAtual=1&tamanhoPagina=10

    const url = `${process.env.RESUMO_PEDIDOS_PATH}`;

    const params = {
      idUsuario,
      idGrupoEmpresa,
      paginaAtual: 1,
      tamanhoPagina: 10,
    };

    const response = await httpClient({ method: 'get', url, headers, params });

    const ordersRaw = response?.data?.pedidos || [];

    const orders = ordersRaw.map((order) => ({
      orderId: order.idPedido + '',
      date: order.dataCriacao,
      value: (order.valorBeneficio || '0,00') + '',
      status: {
        enum: order.statusPedido || 'INDEFINIDO',
        label: order.statusPedido || '-',
      },
      paymentStatus: {
        enum: order.statusPagamento || 'INDEFINIDO',
        label: order.statusPagamento || '-',
      },
    }));

    res.status(200).json({ orders });
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
