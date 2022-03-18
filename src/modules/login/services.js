import Krypton from '@/utils/krypton';
import { httpClient } from '@/utils/services';
import { dataMocks } from '@/mocks/data/';
import { getOnlyNumbers } from '@/utils/format';

export const authenticate = async ({
  cpf,
  password,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  const krypton = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);
  const { encryptedKey: apiKey, encryptedData: authorization } =
    await krypton.encrypt({ cpf: getOnlyNumbers(cpf), password });

  console.log({ apiKey, authorization });

  httpClient({
    method: 'post',
    url: '/api/login',
    data: { apiKey, authorization },
  })
    .then(async (response) => {
      const { accessToken, usuario } = response?.data?.mockByPass
        ? dataMocks.session
        : await krypton.decrypt(response.data);

      const timestamp = new Date().getTime() + '';

      const credential = krypton.generateHash(
        process.env.NEXT_PUBLIC_KRYPTON_KEY,
        timestamp,
      );

      const responseGrupoEmpresa = await httpClient({
        method: 'post',
        url: '/api/permissoes',
        data: { accessToken, credential, idUsuario: usuario?.id || '' },
      });

      const responseParametros = await httpClient({
        method: 'post',
        url: '/api/parametros',
        data: {
          accessToken,
          credential,
          idUsuario: usuario?.id || '',
          idGrupoEmpresa: responseGrupoEmpresa?.data?.id,
        },
      });

      const session = {
        accessToken,
        usuario,
        grupoEmpresa: responseGrupoEmpresa?.data || {},
        parametros: responseParametros?.data || {},
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
