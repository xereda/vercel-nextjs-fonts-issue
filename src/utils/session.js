export const revalidateUserSession = async (ctx) => {
  if (!ctx.req.cookies?.session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export const getSessionFromCookie = (req = {}) => {
  const cookieRaw = req?.headers?.session || req?.cookies?.session || '{}';

  const session = JSON.parse(cookieRaw);

  const accessToken = session?.accessToken;
  const client_id = process.env.HEIMDALL_CLIENT_ID;
  const idGrupoEmpresa = session?.grupoEmpresa?.id;
  const idUsuario = session?.usuario?.id;
  const isInvalidSession = !accessToken || !idGrupoEmpresa || !idUsuario;

  return {
    accessToken,
    client_id,
    idGrupoEmpresa,
    idUsuario,
    isInvalidSession,
  };
};
