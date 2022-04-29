import Krypton from '@/utils/krypton';
import { httpClient } from './services';

const krypton = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);

export const revalidateUserSession = async (ctx) => {
  if (!ctx?.req?.cookies?.session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export const makeSessionHeaders = (req = {}) => {
  const cookieRaw = req?.headers?.session || req?.cookies?.session || '{}';

  const session = JSON.parse(cookieRaw);

  const accessToken = session?.accessToken;
  const publicKey = session?.publicKey;
  const timestamp = session?.timestamp;
  const client_id = process.env.HEIMDALL_CLIENT_ID;
  const idGrupoEmpresa = session?.grupoEmpresa?.id;
  const usuario = session?.usuario;
  const idUsuario = session?.usuario?.id;
  const cpf = session?.usuario?.cpf;
  const isInvalidSession = !accessToken || !idGrupoEmpresa || !idUsuario;

  const params = { idUsuario, idGrupoEmpresa };

  const credential = krypton.generateHash(publicKey, new Date().getTime() + '');

  const headers = {
    authorization: `Bearer ${accessToken}`,
    client_id,
    credential,
  };

  return {
    headers,
    accessToken,
    publicKey,
    credential,
    timestamp,
    client_id,
    idGrupoEmpresa,
    usuario,
    idUsuario,
    cpf,
    params,
    isInvalidSession,
  };
};

export const getTempSessionData = async () => {
  const response = await httpClient({
    method: 'post',
    url: process.env.HASH_CODE_TEMPORARIO_PATH,
    headers: {
      client_id: process.env.HEIMDALL_CLIENT_ID,
    },
  });

  const code = response?.data?.code;

  if (!code) {
    throw new Error('Não foi possível obter o hash code temporário');
  }

  const { encryptedKey, encryptedData } = await krypton.encrypt(code);

  console.log({ encryptedKey, encryptedData });

  const responseToken = await httpClient({
    method: 'post',
    url: process.env.TOKEN_TEMPORARIO_PATH,
    headers: {
      client_id: process.env.HEIMDALL_CLIENT_ID,
      apikey: encryptedKey,
      code: encryptedData,
    },
  });

  const session = await krypton.decrypt(responseToken?.data || '');
  const { accessToken, publicKey, timestamp } = session || {};

  if (!accessToken || !publicKey || !timestamp) {
    throw new Error(
      'Não foi possível obter o token para efetivar a alteração de senha',
    );
  }

  const credential = krypton.generateHash(publicKey, new Date().getTime() + '');

  return {
    client_id: process.env.HEIMDALL_CLIENT_ID,
    authorization: `Bearer ${accessToken}`,
    credential,
    timestamp,
  };
};
