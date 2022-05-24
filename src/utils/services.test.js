import { getErrorMessage, makeUrlQueryString, paginate } from './services';

const responseWithArrayOfErrors = {
  response: {
    status: 405,
    data: {
      messages: ['An error from a list of errors'],
    },
  },
};

describe('getErrorMessage', () => {
  test('caso api retorne uma lista de erros, a função retorna a primeira mensagem para a aplicação', () => {
    expect(getErrorMessage(responseWithArrayOfErrors)).toEqual({
      message: responseWithArrayOfErrors.response.data.messages[0],
      status: 405,
    });
  });

  test('caso não seja encontrado uma mensagem na estrutura pré-definida, retorna a mensagem padrão passada como argumento', () => {
    expect(getErrorMessage({}, 'default message')).toEqual({
      message: 'default message',
      status: 500,
    });
  });
});

describe('makeUrlQueryString', () => {
  test('dado um objeto, deve montar uma string com parametros formato query string url', () => {
    expect(makeUrlQueryString({ param1: 'valor1', param2: 'valor2' })).toEqual(
      'param1=valor1&param2=valor2&',
    );
  });

  test('deve retornar uma string vazia caso receba um argumento inválido', () => {
    expect(makeUrlQueryString()).toEqual('');
    expect(makeUrlQueryString([])).toEqual('');
    expect(makeUrlQueryString(0)).toEqual('');
    expect(makeUrlQueryString('aaa')).toEqual('');
    expect(makeUrlQueryString(null)).toEqual('');
    expect(makeUrlQueryString(NaN)).toEqual('');
    expect(makeUrlQueryString(undefined)).toEqual('');
    expect(makeUrlQueryString(() => null)).toEqual('');
  });
});

describe('paginate', () => {
  test('deve retornar uma lista paginada de uma array origem', () => {
    expect(
      paginate({ array: [1, 2, 3, 4, 5, 6], pageNumber: 2, pageSize: 2 }),
    ).toEqual([3, 4]);
  });

  test('deve retornar uma lista vazia caso o número da página não exista', () => {
    expect(
      paginate({ array: [1, 2, 3, 4, 5, 6], pageNumber: 10, pageSize: 2 }),
    ).toEqual([]);
  });

  test('deve retornar uma lista vazia caso receba um argumento inválido', () => {
    expect(paginate()).toEqual([]);
    expect(paginate([])).toEqual([]);
    expect(paginate(0)).toEqual([]);
    expect(paginate('aaa')).toEqual([]);
    expect(paginate(null)).toEqual([]);
    expect(paginate(NaN)).toEqual([]);
    expect(paginate(undefined)).toEqual([]);
    expect(paginate(() => null)).toEqual([]);
  });
});
