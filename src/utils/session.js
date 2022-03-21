import Krypton from '@/utils/krypton';

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
  const idUsuario = session?.usuario?.id;
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
    idUsuario,
    params,
    isInvalidSession,
  };
};
