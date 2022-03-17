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

  const { encrypt, decrypt, generateHash } = makeKrypton();
  const [apiKey, authorization] = await encrypt(cpf, password);

  httpClient({
    method: 'post',
    url: '/api/login',
    data: { apiKey, authorization },
  })
    .then(async (response) => {
      const { accessToken, timestamp, usuario } = response?.data?.mockByPass
        ? dataMocks.session
        : await decrypt(response.data);

      const credential = generateHash(
        process.env.NEXT_PUBLIC_KRYPTON_KEY,
        timestamp,
      );

      const responseGrupoEmpresa = await httpClient({
        method: 'post',
        url: '/api/permissoes',
        data: { accessToken, credential, idUsuario: usuario?.id || '' },
      });

      const session = {
        accessToken,
        timestamp,
        usuario,
        credential,
        grupoEmpresa: responseGrupoEmpresa?.data || {},
      };

      await httpClient({
        method: 'post',
        url: '/api/set-cookie',
        data: session,
      });

      onSuccess(session);
    })
    .catch(onError)
    .finally(onFinally);
};
