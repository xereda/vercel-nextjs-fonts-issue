import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import { paginate } from '@/utils/services';
import { transformOrders } from '@/transform/order';
import ordersMock from '../data/orders';

export const totalOrders = ordersMock.length;

const useLimit = {
  percentage: 51,
  limiteBalance: 'R$ 4.900,00',
  usedLimit: 'R$ 5.100,00',
  totalLimit: 'R$ 10.000,00',
};

const virtualBalance = {
  balanceValue: 'R$ 1.000,00',
};

const getMock = (req) => {
  const page = req?.url?.searchParams?.get?.('page') || 0;
  const filterStatus = req?.url?.searchParams?.get?.('filterStatus');
  const startDate = req?.url?.searchParams?.get?.('startDate');
  const endDate = req?.url?.searchParams?.get?.('endDate');
  const filterOrderId = req?.url?.searchParams?.get?.('filterOrderId');

  const filteringByStatus = (order) => {
    if (filterStatus && order.statusPedido !== filterStatus) {
      return false;
    }

    return true;
  };

  const filteringByDate = (order) => {
    if (
      startDate &&
      endDate &&
      (new Date(order.dataCriacao).getTime() < new Date(startDate).getTime() ||
        new Date(order.dataCriacao).getTime() > new Date(endDate).getTime())
    ) {
      return false;
    }

    return true;
  };

  const filteringByOrderId = (order) => {
    if (filterOrderId && !(order.idPedido + '').includes(filterOrderId)) {
      return false;
    }

    return true;
  };

  const filteredOrders = ordersMock
    .filter(filteringByStatus)
    .filter(filteringByOrderId)
    .filter(filteringByDate);

  const paginatedOrders = paginate({
    array: filteredOrders,
    pageNumber: page,
    pageSize: DASHBOARD_TOTAL_ORDERS_PER_PAGE,
  });

  return {
    useLimit,
    virtualBalance,
    totalItems: filteredOrders.length || 0,
    orders: transformOrders(paginatedOrders),
  };
};

export const getOrdersFromPage = (page) =>
  transformOrders(
    paginate({
      array: ordersMock,
      pageNumber: page,
      pageSize: DASHBOARD_TOTAL_ORDERS_PER_PAGE,
    }),
  );

export default function hadler(req, res, ctx) {
  return res(ctx.status(200), ctx.json(getMock(req)), ctx.delay());
}
