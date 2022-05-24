import { getErrorMessage, httpClient } from '@/utils/services';
import { makeSessionHeaders } from '@/utils/session';
import { transformOrders } from '@/transform/order';
import { formatMoney } from '@/utils/format';
import { format } from 'date-fns';

export default async function handler(req, res) {
  try {
    const { headers, idGrupoEmpresa, params, isInvalidSession } =
      makeSessionHeaders(req);

    const { filterStatus, filterDate, page } = req?.query || {};
    const today = format(new Date(), 'yyyy-MM-dd');

    if (isInvalidSession) {
      throw 'Não foi possível definir os headers de autorização';
    }

    const parameters = {
      ...params,
      paginaAtual: page,
      tamanhoPagina: 10,
    };

    if (filterStatus) {
      parameters.statusPedido = filterStatus;
    }

    if (filterDate) {
      parameters.dataCriacaoInicial = filterDate;
      parameters.dataCriacaoFinal = today;
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
      limiteBalance: formatMoney(responseUseLimit?.data?.valorDisponivel),
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
