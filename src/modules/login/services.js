import Krypton from '@/utils/krypton';
import { httpClient } from '@/utils/services';
import { dataMocks } from '@/mocks/data/';
import { getOnlyNumbers } from '@/utils/format';

const krypton = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);

export const authenticate = async ({
  cpf: cpfWithMask,
  password,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  const cpf = getOnlyNumbers(cpfWithMask);

  const { encryptedKey: apiKey, encryptedData: authorization } =
    await krypton.encrypt({ cpf, password });

  httpClient({
    method: 'post',
    url: '/api/login',
    data: { apiKey, authorization },
  })
    .then(async (response) => {
      const { mockByPass } = response?.data || {};

      const { accessToken, usuario, publicKey } = !mockByPass
        ? await krypton.decrypt(response.data)
        : dataMocks.session;

      if (!accessToken || !usuario || !publicKey) {
        throw 'Não foi possível realizar o login. [E0030]';
      }

      const credential = !mockByPass
        ? krypton.generateHash(publicKey, new Date().getTime() + '')
        : 'credential key';

      const responseGrupoEmpresa = await httpClient({
        method: 'post',
        url: '/api/permissoes',
        data: { accessToken, credential, idUsuario: usuario?.id || '' },
      });

      const responseStatusUsuario = await httpClient({
        method: 'post',
        url: '/api/user-status',
        data: { accessToken, credential, cpf, idUsuario: usuario?.id },
      });

      const responseAceiteTermos = await httpClient({
        method: 'post',
        url: '/api/aceite-termos',
        data: { accessToken, credential, cpf },
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

      const usuarioAceitouTermos = responseAceiteTermos?.data || false;
      const grupoEmpresa = responseGrupoEmpresa?.data || {};
      const parametros = responseParametros?.data || {};
      const statusUsuario = responseStatusUsuario?.data || {};

      await httpClient({
        method: 'post',
        url: '/api/set-cookie',
        data: {
          accessToken,
          publicKey,
          usuario: {...usuario, ...statusUsuario },
          grupoEmpresa,
          parametros,
        },
      });

      onSuccess({
        usuario: {...usuario, ...statusUsuario },
        grupoEmpresa,
        parametros,
        usuarioAceitouTermos,
      });
    })
    .catch(onError)
    .finally(onFinally);
};
