import cookie from 'cookie';

export const saveCookie = ({ res, rawCookie }) => {
  const cookieValue = JSON.stringify(rawCookie);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 170,
      expires: false,
      sameSite: 'strict',
      path: '/',
    }),
  );
};