import { httpClient } from '@/utils/services';

export const createPassword = async ({
  password,
  token,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  await httpClient({
    method: 'post',
    url: '/api/criar-senha',
    data: { novaSenha: password, token },
  })
    .then(async (response) => {
      onSuccess({ response });
    })
    .catch(onError)
    .finally(onFinally);
};
