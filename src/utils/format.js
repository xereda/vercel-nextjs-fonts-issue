import { format, parse } from 'date-fns';
import { validate } from 'gerador-validador-cpf';

export const getOnlyNumbers = (value = '') => {
  if (value && typeof value === 'string') {
    return value.replace(/\D/g, '');
  }

  return null;
};

export const toCPFMask = (cpf) => {
  if (cpf && typeof cpf === 'string') {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  return '';
};

export const isValidCPF = validate;

export const formatDateWithTime = (date) => {
  try {
    if (date && typeof date === 'string') {
      return format(new Date(date), 'dd/MM/yyyy - hh:mm:ss');
    }

    return null;
  } catch (e) {
    process.env.NODE_ENV !== 'test' &&
      console.error(
        'Erro ao formatar uma data para o formato com hora "dd/MM/yyyy - hh:mm:ss" (date-fns)',
        `Formato de entrada: ${date}`,
        e,
      );

    return null;
  }
};

export const formatMoney = (value) => {
  if (value !== '' && typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  return null;
};

export const parseToBrazilianDate = (date) => {
  try {
    if (date && typeof date === 'string') {
      return format(parse(date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
    }

    return null;
  } catch (e) {
    process.env.NODE_ENV !== 'test' &&
      console.error(
        'Erro ao formatar a data para o padrão "dd/MM/yyyy (date-fns)',
        `Formato de entrada: ${date}`,
        e,
      );

    return null;
  }
};

export const parseToDefaultDate = (date) => {
  try {
    if (date && typeof date === 'string') {
      return format(parse(date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
    }

    return null;
  } catch (e) {
    process.env.NODE_ENV !== 'test' &&
      console.error(
        'Erro ao formatar a data para o padrão "yyyy-MM-dd (date-fns)',
        `Formato de entrada: ${date}`,
        e,
      );

    return null;
  }
};

export const toMaskDate = (value = '') => {
  return value
    ?.replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '$1/$2')
    ?.replace(/(\d{2})(\d)/, '$1/$2');
};

export const isValidDate = (date = '') => {
  if (date) {
    const regex =
      /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
    const result = regex.test(date);

    return result;
  }

  return false;
};

export const isDateInFuture = (date) => {
  if (date && typeof date === 'string') {
    const parts = date.split('/');
    const result = new Date(parts[2], parts[1] - 1, parts[0]) > new Date();

    return result;
  }

  return false;
};

export const toPhoneMask = (value = '') => {
  if (value && typeof value === 'string') {
    const onlyNumbers = value.replace(/\D/g, '');
    const formatNumbers = onlyNumbers.replace(/^(\d{2})(\d)/g, '($1) $2');
    const formattedNumber = formatNumbers.replace(/(\d)(\d{4})$/, '$1-$2');

    return formattedNumber;
  }

  return '';
};

export const isValidPhone = (value = '') => {
  if (value && typeof value === 'string') {
    const phoneLength = getOnlyNumbers(value).length;

    if (phoneLength === 10 || phoneLength === 11) {
      return true;
    }
  }

  return false;
};

export const isStrongPassword = (value) => {
  const result = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/).test(value);

  return result;
};

export const isValidEmail = (email) => {
  if (email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return false;
};
