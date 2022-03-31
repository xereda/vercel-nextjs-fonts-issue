import { httpClient } from '@/utils/services';
import { getOnlyNumbers, parseToDefaultDate } from '@/utils/format';

export const postStatus = async ({
  birthdate,
  phone,
  motherName,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  const formattedPhone = getOnlyNumbers(phone);

  onStart?.();

  httpClient({
    method: 'put',
    url: '/api/user-status',
    data: {
      dataNascimento: parseToDefaultDate(birthdate),
      ddd: formattedPhone.substring(0, 2),
      telefone: formattedPhone.substring(2),
      nomeMae: motherName,
    },
  })
    .then(async (response) => {
      onSuccess({ response });
    })
    .catch(onError)
    .finally(onFinally);
};
