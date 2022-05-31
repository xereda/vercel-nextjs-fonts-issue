import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { transformOrders } from '@/transform/order';
import { formatMoney } from '@/utils/format';
import { format } from 'date-fns';

export default async function handler(req, res) {
  try {
    const { headers, idGrupoEmpresa, params } = makeSessionHeaders(req);

    const { filterStatus, filterDate, filterOrderId, page } = req?.query || {};

    const parameters = {
      ...params,
      paginaAtual: page,
      tamanhoPagina: DASHBOARD_TOTAL_ORDERS_PER_PAGE,
    };

    if (filterStatus) {
      parameters.statusPedido = filterStatus;
    }

    if (filterOrderId) {
      parameters.idPedido = filterOrderId;
    }

    if (filterDate) {
      parameters.dataCriacaoInicial = filterDate;
      parameters.dataCriacaoFinal = format(new Date(), 'yyyy-MM-dd');
    }

    const responseOrders = await httpClient({
      method: 'get',
      url: process.env.RESUMO_PEDIDOS_PATH,
      headers,
      params: parameters,
    });

    const orders = transformOrders(responseOrders?.data?.pedidos || []);
    const totalItems = responseOrders?.data?.meta?.total || 0;

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

    const virtualBalance = {
      balanceValue: formatMoney(responseVirtualBalance?.data?.saldo),
    };

    const responseUseLimit = await httpClient({
      method: 'get',
      url: process.env.LIMITE_VIRTUAL_PATH,
      headers,
      params,
    });

    const useLimit = {
      percentage: responseUseLimit?.data?.porcentagemUtilizado,
      limiteBalance: formatMoney(
        responseUseLimit?.data?.valorDisponivel > 0
          ? responseUseLimit?.data?.valorDisponivel
          : 0,
      ),
      usedLimit: formatMoney(responseUseLimit?.data?.valorUtilizado),
      totalLimit: formatMoney(responseUseLimit?.data?.valorLimiteDisponivel),
    };

    res.status(200).json({ orders, virtualBalance, useLimit, totalItems });
  } catch (e) {
    const error = getErrorMessage(
      e,
      'Não foi possível obter os dados para o dashboard de pedidos',
    );

    res.status(error.status).json({ error });
  }
}
