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
      orderId: '1111',
      date: '04/01/2022 - 14:35:00',
      value: 'R$ 2.635,01',
      status: { enum: 'CONCLUIDO', label: 'Concluído' },
      paymentStatus: { enum: 'AGUARDANDO', label: 'Aguardando' },
    },
    {
      orderId: '2222',
      date: '20/12/2021 - 11:35:10',
      value: 'R$ 150.650,00',
      status: { enum: 'CONCLUIDO', label: 'Concluído' },
      paymentStatus: { enum: 'PAGO', label: 'Pago' },
    },
  ],
};
