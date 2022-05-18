import { formatDateWithTime, formatMoney } from '@/utils/format';
import { orderStatusEnum, paymentStatusEnum } from './order.enums';

export const transformOrders = (orders) =>
  orders.map((order) => ({
    orderId: order.idPedido + '',
    date: formatDateWithTime(order.dataCriacao),
    value: formatMoney(order.valorBeneficio) || '-',
    canCancel: !!order.podeCancelar,
    status: {
      enum: order.statusPedido || 'INDEFINIDO',
      label: orderStatusEnum[order.statusPedido]?.label || '-',
      color:
        orderStatusEnum[order.statusPedido]?.color || '--bds-color-black-light',
    },
    paymentStatus: {
      enum: order.statusPagamento || 'INDEFINIDO',
      label: paymentStatusEnum[order.statusPagamento]?.label || '-',
      color:
        paymentStatusEnum[order.statusPagamento]?.color ||
        '--bds-color-black-light',
    },
  }));
