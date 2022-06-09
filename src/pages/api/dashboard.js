import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { transformOrders } from '@/transform/order';
import { formatMoney } from '@/utils/format';

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

const loadVirtualBalance = async ({ headers, params, idGrupoEmpresa }) => {
  const urlVirtualBalance = process.env.SALDO_CONTA_VIRTUAL_PATH.replace(
    '[idGrupoEmpresa]',
    idGrupoEmpresa,
  );

  const responseVirtualBalance = await httpClient({
    method: 'get',
    url: urlVirtualBalance,
    headers,
    params,
  });

  return {
    balanceValue: formatMoney(responseVirtualBalance?.data?.saldo),
  };
};

const loadUseLimit = async ({ headers, params }) => {
  const responseUseLimit = await httpClient({
    method: 'get',
    url: process.env.LIMITE_VIRTUAL_PATH,
    headers,
    params,
  });

  return {
    percentage: responseUseLimit?.data?.porcentagemUtilizado,
    limiteBalance: formatMoney(
      responseUseLimit?.data?.valorDisponivel > 0
        ? responseUseLimit?.data?.valorDisponivel
        : 0,
    ),
    usedLimit: formatMoney(responseUseLimit?.data?.valorUtilizado),
    totalLimit: formatMoney(responseUseLimit?.data?.valorLimiteDisponivel),
  };
};

export default async function handler(req, res) {
  try {
    const { headers, idGrupoEmpresa, params } = makeSessionHeaders(req);

    const { filterStatus, startDate, endDate, filterOrderId, page } =
      req?.query || {};

    const parameters = {
      paginaAtual: page,
      tamanhoPagina: DASHBOARD_TOTAL_ORDERS_PER_PAGE,
    };

    if (filterOrderId) {
      parameters.idPedido = filterOrderId;
    }

    if (startDate) {
      parameters.dataCriacaoInicial = startDate;
      parameters.dataCriacaoFinal = endDate;
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

    const waitingConfirmationOrders =
      orders
        ?.filter((order) => order?.status?.enum === 'AGUARDANDO_CONFIRMACAO')
        .map((order) => order.orderId) || [];

    const virtualBalance = await loadVirtualBalance({
      headers,
      params,
      idGrupoEmpresa,
    });

    const useLimit = await loadUseLimit({ headers, params });

    res.status(200).json({
      orders,
      waitingConfirmationOrders,
      totalItems,
      virtualBalance,
      useLimit,
    });
  } catch (e) {
    const error = getErrorMessage(
      e,
      'Não foi possível obter os dados para o dashboard de pedidos',
    );

    res.status(error.status).json({ error });
  }
}
