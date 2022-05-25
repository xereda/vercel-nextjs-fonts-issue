export const orderStatusEnum = {
  VALIDANDO_ARQUIVO: {
    label: 'Validando arquivo',
    color: '--bds-color-blue',
  },
  PROCESSANDO: {
    label: 'Processando',
    color: '--bds-color-blue',
  },
  INVALIDADO: {
    label: 'Invalidado',
    color: '--bds-color-red-dark',
  },
  CONCLUIDO: {
    label: 'Concluído',
    color: '--bds-color-green',
  },
  VALIDADO_PARCIAL: {
    label: 'Validado parcial',
    color: '--bds-color-blue',
  },
  CANCELADO: {
    label: 'Cancelado',
    color: '--bds-color-red-dark',
  },
  CANCELADO_PARCIAL: {
    label: 'Cancelado parcial',
    color: '--bds-color-yellow-dark',
  },
  AGUARDANDO_CONFIRMACAO: {
    label: 'Aguardando confirmação',
    color: '--bds-color-black-lighter',
  },
  EXPIRADO: {
    label: 'Expirado',
    color: '--bds-color-red-dark',
  },
};

export const paymentStatusEnum = {
  PAGO: {
    label: 'Pago',
    color: '--bds-color-green',
  },
  EXPIRADO: {
    label: 'Expirado',
    color: '--bds-color-red-dark',
  },
  PAGO_PARCIALMENTE: {
    label: 'Pago parcialmente',
    color: '--bds-color-yellow-dark',
  },
  AGUARDANDO_PAGAMENTO: {
    label: 'Aguardando',
    color: '--bds-color-yellow-dark',
  },
  LIMITE_CREDITO_VENCIDO: {
    label: 'Limite de crédito vencido',
    color: '--bds-color-red-dark',
  },
  LIMITE_CREDITO_INSUFICIENTE: {
    label: 'Limite de crédito insuficiente',
    color: '--bds-color-red-dark',
  },
  CANCELADO: {
    label: 'Cancelado',
    color: '--bds-color-red-dark',
  },
  CANCELADO_PARCIAL: {
    label: 'Parcialmente cancelado',
    color: '--bds-color-yellow-dark',
  },
  FATURA_EM_ABERTO: {
    label: 'Fatura em aberto',
    color: '--bds-color-yellow-dark',
  },
};
