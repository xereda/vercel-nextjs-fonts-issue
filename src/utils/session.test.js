import { revalidateUserSession } from './session';

describe('session utils functions', () => {
  test('deve retonar um objeto para sinalizar o roteamento para a página de login se o cookie de sessão não estiver presente', async () => {
    expect(await revalidateUserSession()).toEqual({
      redirect: {
        destination: '/login',
        permanent: false,
      },
    });
  });

  test('deve retonar um objeto contendo apenas a propriedade props, permitindo assim, acesso a rota ', async () => {
    expect(
      await revalidateUserSession({
        req: { cookies: { session: 'cookie-value' } },
      }),
    ).toEqual({
      props: {},
    });
  });
});
