import { format, parse } from 'date-fns';
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

export const parseToBrazilianDate = (date) =>
  date ? format(parse(date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : null;

export const parseToDefaultDate = (date) =>
  date ? format(parse(date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null;

export const toMaskDate = (value = '') => {
  return value
    ?.replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '$1/$2')
    ?.replace(/(\d{2})(\d)/, '$1/$2');
};

export const isValidDate = (date = '') => {
  /* eslint-disable */
  const regex =
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  const result = regex.test(date);

  return result;
};

export const isDateInFuture = (date) => {
  if (date) {
    const parts = date.split('/');
    const result = new Date(parts[2], parts[1] - 1, parts[0]) > new Date();

    return result;
  }

  return null;
};

export const toPhoneMask = (value = '') => {
  if (value) {
    const onlyNumbers = value.replace(/\D/g, '');
    const formatNumbers = onlyNumbers.replace(/^(\d{2})(\d)/g, '($1) $2');
    const formattedNumber = formatNumbers.replace(/(\d)(\d{4})$/, '$1-$2');

    return formattedNumber;
  }

  return '';
};

export const isValidPhone = (value = '') => {
  const phoneLength = getOnlyNumbers(value).length;
  if (phoneLength === 10 || phoneLength === 11) {
    return true;
  }

  return false;
}
