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

      const responseGruposEmpresa = await httpClient({
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

      const usuarioAceitouTermos = responseAceiteTermos?.data || false;
      const gruposEmpresa = responseGruposEmpresa?.data || [];
      const statusUsuario = responseStatusUsuario?.data || {};

      let session = {};

      if (gruposEmpresa.length === 1) {

        const responseParametros = await httpClient({
          method: 'post',
          url: '/api/parametros',
          data: {
            accessToken,
            credential,
            idUsuario: usuario?.id || '',
            idGrupoEmpresa: gruposEmpresa[0].id,
          },
        });

        const parametros = responseParametros?.data || {};

        session = {
          usuario: { ...usuario, ...statusUsuario },
          grupoEmpresa: gruposEmpresa[0],
          parametros,
          usuarioAceitouTermos,
        };

        await httpClient({
          method: 'post',
          url: '/api/set-cookie',
          data: {
            ...session,
            accessToken,
            publicKey,
          },
        });
      } else {
        session = {
          usuario: { ...usuario, ...statusUsuario },
          gruposEmpresa,
          usuarioAceitouTermos,
        };

        await httpClient({
          method: 'post',
          url: '/api/set-cookie',
          data: {
            ...session,
            accessToken,
            publicKey,
          },
        });
      };

      onSuccess(session);
    })
    .catch(onError)
    .finally(onFinally);
};
