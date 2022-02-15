const mock = {
  useLimit: {
    percentage: 2,
    limiteBalance: 'R$ 98,00',
    usedLimit: 'R$ 2,00',
    totalLimit: 'R$ 100,00',
  },
  virtualBalance: {
    balanceValue: 'R$ 9.999,99',
  },
  orders: [
    {
      orderId: '4444',
      date: '04/01/2022 - 14:35:00',
      value: 'R$ 2.635,01',
      status: { enum: 'CONCLUIDO', label: 'Concluído' },
      paymentStatus: { enum: 'AGUARDANDO', label: 'Aguardando' },
    },
    {
      orderId: '8888',
      date: '20/12/2021 - 11:35:10',
      value: 'R$ 150.650,00',
      status: { enum: 'CONCLUIDO', label: 'Concluído' },
      paymentStatus: { enum: 'PAGO', label: 'Pago' },
    },
  ],
};

export default function handler(req, res) {
  res.status(200).json(mock);
}
