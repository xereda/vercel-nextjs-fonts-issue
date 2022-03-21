import { getErrorMessage } from './services';

const responseWithArrayOfErrors = {
  response: {
    status: 405,
    data: {
      messages: ['An error from a list of errors'],
    },
  },
};

describe('services utils functions', () => {
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
