import { stripTags } from './string';

describe('stripTags', () => {
  test('deve retornar um string sem as tags html', () => {
    expect(stripTags('<span>123</span>')).toBe('123');
    expect(stripTags('<span attr="test"> </span>')).toBe('');
  });

  test('deve retornar um string vazia quando o argumento for invalido', () => {
    expect(stripTags()).toBe('');
    expect(stripTags(null)).toBe('');
    expect(stripTags(undefined)).toBe('');
    expect(stripTags(0)).toBe('');
    expect(stripTags(NaN)).toBe('');
    expect(stripTags('')).toBe('');
  });
});
