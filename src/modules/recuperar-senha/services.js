import { httpClient } from '@/utils/services';
import { getOnlyNumbers } from '@/utils/format';

export const recoverPassword = async ({
  cpf,
  email,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  await httpClient({
    method: 'put',
    url: '/api/recuperar-senha',
    data: {
      cpf: getOnlyNumbers(cpf),
      email,
      plataforma: 'RH',
    },
  })
    .then(async (response) => {
      onSuccess({ response });
    })
    .catch(onError)
    .finally(onFinally);
};