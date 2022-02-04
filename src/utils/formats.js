import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';

export const toMoneyMask = value => {
  if (!isNil(value) && isNumber(+value) && !isNaN(value)) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  }

  return '';
};
