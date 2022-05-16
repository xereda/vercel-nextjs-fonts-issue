export default {
  useLimit: {
    percentage: 1,
    limiteBalance: 'R$ 99,00',
    usedLimit: 'R$ 1,00',
    totalLimit: 'R$ 100,00',
  },
  virtualBalance: {
    balanceValue: 'R$ 1.000,00',
  },
  orders: [
    {
      orderId: '3333',
      date: '04/01/2022 - 14:35:00',
      value: 'R$ 2.635,01',
      canCancel: true,
      status: {
        enum: 'CONCLUIDO',
        label: 'Concluído',
        color: '--bds-color-green',
      },
      paymentStatus: {
        enum: 'AGUARDANDO',
        label: 'Aguardando',
        color: '--bds-color-yellow',
      },
    },
    {
      orderId: '2222',
      date: '20/12/2021 - 11:35:10',
      value: 'R$ 150.650,00',
      canCancel: true,
      status: {
        enum: 'AGUARDANDO_CONIRMACAO',
        label: 'Aguardando confirmação',
        color: '--bds-color-black-lighter',
      },
      paymentStatus: {
        enum: 'PAGO',
        label: 'Pago',
        color: '--bds-color-green',
      },
    },
    {
      orderId: '1111',
      date: '15/11/2021 - 15:07:54',
      value: 'R$ 580.344,97',
      canCancel: false,
      status: {
        enum: 'CANCELADO',
        label: 'Cancelado',
        color: '--bds-color-red',
      },
      paymentStatus: {
        enum: 'LIMITE_CREDITO_INSUFICIENTE',
        label: 'Limite de crédito insuficiente',
        color: '--bds-color-red',
      },
    },
    {
      orderId: '0957',
      date: '13/11/2021 - 12:41:32',
      value: 'R$ 903.889,05',
      canCancel: true,
      status: {
        enum: 'INVALIDADO',
        label: 'Invalidado',
        color: '--bds-color-red',
      },
      paymentStatus: {
        enum: '-',
        label: '-',
        color: '--bds-color-black-light',
      },
    },
  ],
};
