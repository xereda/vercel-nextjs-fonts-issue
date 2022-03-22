import { format } from 'date-fns';
import { validate } from 'gerador-validador-cpf';

export const getOnlyNumbers = (string = '') => string.replace(/\D/g, '');

export const toCPFMask = (cpf) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const isValidCPF = validate;

export const formatDateWithTime = (date) =>
  format(new Date(date), 'dd/MM/yyyy - hh:mm:ss');

export const formatMoney = (value = 0) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
