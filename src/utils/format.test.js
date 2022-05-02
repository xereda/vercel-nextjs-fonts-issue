import {
  formatDateWithTime,
  formatMoney,
  getOnlyNumbers,
  isDateInFuture,
  isStrongPassword,
  isValidDate,
  isValidEmail,
  isValidPhone,
  parseToBrazilianDate,
  parseToDefaultDate,
  toCPFMask,
  toPhoneMask,
} from './format';

describe('getOnlyNumbers', () => {
  test('deve retornar o numero sem pontos e traços', () => {
    const result = getOnlyNumbers('111.111.111-11');
    expect(result).toBe('11111111111');
  });

  test('deve retornar apenas os números da string passada como argumento', () => {
    const result = getOnlyNumbers(' @1#2$3ç4~5?6,7.8_9-10 11 = !  ');
    expect(result).toBe('1234567891011');
  });

  test('deve retornar string vazia quando getOnlyNumbers receber um argumento sem números', () => {
    expect(getOnlyNumbers('string')).toBe('');
  });

  test('deve retornar null quando getOnlyNumbers receber um argumento inválido', () => {
    expect(getOnlyNumbers(false)).toBe(null);
    expect(getOnlyNumbers(123)).toBe(null);
    expect(getOnlyNumbers([1, 2, 3])).toBe(null);
    expect(getOnlyNumbers({ value: 1 })).toBe(null);
    expect(getOnlyNumbers(null)).toBe(null);
    expect(getOnlyNumbers(undefined)).toBe(null);
  });
});

describe('toCPFMask', () => {
  test('deve retornar o cpf com a máscara', () => {
    const result = toCPFMask('11111111111');
    expect(result).toBe('111.111.111-11');
  });

  test('deve retornar string vazia quando toCPFMask receber um argumento inválido', () => {
    expect(toCPFMask('string')).toBe('');
    expect(toCPFMask(false)).toBe('');
    expect(toCPFMask(123)).toBe('');
    expect(toCPFMask([1, 2, 3])).toBe('');
    expect(toCPFMask({ value: 1 })).toBe('');
    expect(toCPFMask(null)).toBe('');
    expect(toCPFMask(undefined)).toBe('');
  });
});

describe('formatDateWithTime', () => {
  test('deve retornar a data com a hora', () => {
    const result = formatDateWithTime('1999-04-18T10:00:00.000');
    expect(result).toBe('18/04/1999 - 10:00:00');
  });

  test('deve retornar null quando o formato for inválido', () => {
    const result = formatDateWithTime('20-05-1995');
    expect(result).toBe(null);
  });

  test('deve retornar null quando formatDateWithTime receber um argumento inválido', () => {
    expect(formatDateWithTime('string')).toBe(null);
    expect(formatDateWithTime('')).toBe(null);
    expect(formatDateWithTime(false)).toBe(null);
    expect(formatDateWithTime([1, 2, 3])).toBe(null);
    expect(formatDateWithTime({ value: 1 })).toBe(null);
    expect(formatDateWithTime(null)).toBe(null);
    expect(formatDateWithTime(undefined)).toBe(null);
  });
});

describe('formatMoney', () => {
  test('deve retornar uma string com formato monetário', () => {
    const result = formatMoney(1111.11);
    expect(result).toBe('R$\xa01.111,11');
  });

  test('deve retornar null quando formatMoney receber um argumento inválido', () => {
    expect(formatMoney('string')).toBe(null);
    expect(formatMoney(true)).toBe(null);
    expect(formatMoney([1, 2, 3])).toBe(null);
    expect(formatMoney({ value: 1 })).toBe(null);
    expect(formatMoney(null)).toBe(null);
    expect(formatMoney(undefined)).toBe(null);
  });
});

describe('parseToBrazilianDate', () => {
  test('deve retornar a data no formato dd/MM/yyyy', () => {
    const result = parseToBrazilianDate('1976-12-25');
    expect(result).toBe('25/12/1976');
  });

  test('deve retornar null quando o formato da data for inválido', () => {
    const result = parseToBrazilianDate('20-05-1995');
    expect(result).toBe(null);
  });

  test('deve retornar null quando parseToBrazilianDate receber um argumento inválido', () => {
    expect(parseToBrazilianDate('string')).toBe(null);
    expect(parseToBrazilianDate('')).toBe(null);
    expect(parseToBrazilianDate(false)).toBe(null);
    expect(parseToBrazilianDate([1, 2, 3])).toBe(null);
    expect(parseToBrazilianDate({ value: 1 })).toBe(null);
    expect(parseToBrazilianDate(null)).toBe(null);
    expect(parseToBrazilianDate(undefined)).toBe(null);
  });
});

// parseToDefaultDate tests
describe('parseToDefaultDate', () => {
  test('deve retornar a data no formato yyyy/MM/dd', () => {
    const result = parseToDefaultDate('25/12/1976');
    expect(result).toBe('1976-12-25');
  });

  test('deve retornar null quando o formato for inválido', () => {
    const result = parseToDefaultDate('20-05-1995');
    expect(result).toBe(null);
  });

  test('deve retornar null quando parseToDefaultDate receber um argumento inválido', () => {
    expect(parseToDefaultDate('20-05-1995')).toBe(null);
    expect(parseToDefaultDate('')).toBe(null);
    expect(parseToDefaultDate(false)).toBe(null);
    expect(parseToDefaultDate([1, 2, 3])).toBe(null);
    expect(parseToDefaultDate({ value: 1 })).toBe(null);
    expect(parseToDefaultDate(null)).toBe(null);
    expect(parseToDefaultDate(undefined)).toBe(null);
  });
});

describe('isValidDate', () => {
  test('deve retornar true quando receber uma data válida', () => {
    const result = isValidDate('10/10/2000');
    expect(result).toBe(true);
  });

  test('deve retornar false quando receber uma data inválida', () => {
    const result = isValidDate('25/18/1976');
    expect(result).toBe(false);
  });

  test('deve retornar false quando isValidDate receber um argumento inválido', () => {
    expect(isValidDate('string')).toBe(false);
    expect(isValidDate(false)).toBe(false);
    expect(isValidDate([1, 2, 3])).toBe(false);
    expect(isValidDate({ value: 1 })).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
  });
});

// isDateInFuture tests
describe('isDateInFuture', () => {
  test('deve retornar true quando receber data no futuro', () => {
    const result = isDateInFuture('25/12/2022');
    expect(result).toBe(true);
  });

  test('deve retornar false quando não receber data no futuro', () => {
    const result = isDateInFuture('01/01/2022');
    expect(result).toBe(false);
  });

  test('deve retornar false quando receber um argumento inválido', () => {
    expect(isDateInFuture('string')).toBe(false);
    expect(isDateInFuture(123)).toBe(false);
    expect(isDateInFuture(false)).toBe(false);
    expect(isDateInFuture([1, 2, 3])).toBe(false);
    expect(isDateInFuture({ value: 1 })).toBe(false);
    expect(isDateInFuture(null)).toBe(false);
    expect(isDateInFuture(undefined)).toBe(false);
  });
});

describe('toPhoneMask', () => {
  test('deve retornar telefone com a mascara', () => {
    const result = toPhoneMask('11999999999');
    expect(result).toBe('(11) 99999-9999');
  });

  test('deve retornar string vazia quando receber um argumento inválido', () => {
    expect(toPhoneMask('string')).toBe('');
    expect(toPhoneMask(false)).toBe('');
    expect(toPhoneMask(123)).toBe('');
    expect(toPhoneMask([1, 2, 3])).toBe('');
    expect(toPhoneMask({ value: 1 })).toBe('');
    expect(toPhoneMask(null)).toBe('');
    expect(toPhoneMask(undefined)).toBe('');
  });
});

describe('isValidPhone', () => {
  test('deve retornar true quando receber telefone válido', () => {
    const result = isValidPhone('(11) 99999-9999');
    expect(result).toBe(true);
  });

  test('deve retornar false quando receber um argumento inválido', () => {
    expect(isValidPhone('(11) 99999-99')).toBe(false);
    expect(isValidPhone('string')).toBe(false);
    expect(isValidPhone(123)).toBe(false);
    expect(isValidPhone(false)).toBe(false);
    expect(isValidPhone([1, 2, 3])).toBe(false);
    expect(isValidPhone({ value: 1 })).toBe(false);
    expect(isValidPhone(null)).toBe(false);
    expect(isValidPhone(undefined)).toBe(false);
  });
});

describe('isStrongPassword', () => {
  test('deve retornar true quando receber senha forte', () => {
    const result = isStrongPassword('1Aa@1234');
    expect(result).toBe(true);
  });

  test('deve retornar false quando receber um argumento inválido', () => {
    expect(isStrongPassword('12345')).toBe(false);
    expect(isStrongPassword('string')).toBe(false);
    expect(isStrongPassword(123)).toBe(false);
    expect(isStrongPassword(false)).toBe(false);
    expect(isStrongPassword([1, 2, 3])).toBe(false);
    expect(isStrongPassword({ value: 1 })).toBe(false);
    expect(isStrongPassword(null)).toBe(false);
    expect(isStrongPassword(undefined)).toBe(false);
  });
});

describe('isValidEmail', () => {
  test('deve retornar true quando receber email válido', () => {
    const result = isValidEmail('teste@email.com');
    expect(result).toBe(true);
  });

  test.only('deve retornar false quando receber um argumento inválido', () => {
    expect(isValidEmail('teste@email')).toBe(false);
    expect(isValidEmail('string')).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail(false)).toBe(false);
    expect(isValidEmail([1, 2, 3])).toBe(false);
    expect(isValidEmail({ value: 1 })).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});