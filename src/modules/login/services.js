import Krypton from '@/utils/krypton';
import { httpClient } from '@/utils/services';
import { dataMocks } from '@/mocks/data/';
import { getOnlyNumbers } from '@/utils/format';

const krypton = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);

export const authenticate = async ({
  cpf,
  password,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  const { encryptedKey: apiKey, encryptedData: authorization } =
    await krypton.encrypt({ cpf: getOnlyNumbers(cpf), password });

  httpClient({
    method: 'post',
    url: '/api/login',
    data: { apiKey, authorization },
  })
    .then(async (response) => {
      const { accessToken, usuario, publicKey } = response?.data?.mockByPass
        ? dataMocks.session
        : await krypton.decrypt(response.data);

      const credential = krypton.generateHash(
        publicKey,
        new Date().getTime() + '',
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
        publicKey,
        credential,
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
