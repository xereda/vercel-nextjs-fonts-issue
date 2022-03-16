import cookie from 'cookie';

export default (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: -1,
      expires: false,
      sameSite: 'strict',
      path: '/',
    }),
  );

  res.statusCode = 200;
  res.json({ success: true });
};
