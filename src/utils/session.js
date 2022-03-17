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
