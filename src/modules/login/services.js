import { makeKrypton } from '@/utils/krypton';
import { httpClient } from '@/utils/services';
import { dataMocks } from '@/mocks/data/';

export const authenticate = async ({
  cpf,
  password,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  console.log({ cpf, password });

  const { encrypt, decrypt } = makeKrypton();
  const [apiKey, authorization] = await encrypt(cpf, password);

  httpClient
    .post('/api/login', { apiKey, authorization })
    .then(async (response) => {
      const decrypted = response?.data?.mockByPass
        ? dataMocks.session
        : await decrypt(response.data);

      onSuccess(decrypted);
    })
    .catch(onError)
    .finally(onFinally);
};
