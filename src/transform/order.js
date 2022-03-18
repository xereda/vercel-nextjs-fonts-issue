import { formatDateWithTime, formatMoney } from '@/utils/format';
import { orderStatusEnum, paymentStatusEnum } from './order.enums';

export const transformOrders = (orders) =>
  orders.map((order) => ({
    orderId: order.idPedido + '',
    date: formatDateWithTime(order.dataCriacao),
    value: formatMoney(order.valorBeneficio),
    status: {
      enum: order.statusPedido || 'INDEFINIDO',
      label: orderStatusEnum[order.statusPedido]?.label || '-',
    },
    paymentStatus: {
      enum: order.statusPagamento || 'INDEFINIDO',
      label: paymentStatusEnum[order.statusPagamento]?.label || '-',
    },
  }));
