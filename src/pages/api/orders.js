import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { transformOrders } from '@/transform/order';
import { format } from 'date-fns';

const loadOrders = async ({ headers, params }) => {
  const responseOrders = await httpClient({
    method: 'get',
    url: process.env.RESUMO_PEDIDOS_PATH,
    headers,
    params,
  });

  return {
    orders: transformOrders(responseOrders?.data?.pedidos || []),
    totalItems: responseOrders?.data?.meta?.total || 0,
  };
};

export default async function handler(req, res) {
  try {
    const { headers, params } = makeSessionHeaders(req);

    const { filterStatus, filterDate, filterOrderId, page } = req?.query || {};

    const parameters = {
      paginaAtual: page,
      tamanhoPagina: DASHBOARD_TOTAL_ORDERS_PER_PAGE,
    };

    if (filterOrderId) {
      parameters.idPedido = filterOrderId;
    }

    if (filterDate) {
      parameters.dataCriacaoInicial = filterDate;
      parameters.dataCriacaoFinal = format(new Date(), 'yyyy-MM-dd');
    }

    if (filterStatus) {
      parameters.statusPedido = filterStatus;
    }

    const { orders, totalItems } = await loadOrders({
      headers,
      params: {
        ...params,
        ...parameters,
      },
    });

    res.status(200).json({
      orders,
      totalItems,
    });
  } catch (e) {
    const error = getErrorMessage(
      e,
      'Não foi possível obter a lista de pedidos',
    );

    res.status(error.status).json({ error });
  }
}
