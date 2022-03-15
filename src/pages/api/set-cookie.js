import cookie from 'cookie';

export default (req, res) => {
  console.log('req.body: ', req.body);

  const cookieValue = JSON.stringify(req.body);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 365 * 24 * 60 * 60,
      expires: false,
      sameSite: 'strict',
      path: '/',
    }),
  );

  res.statusCode = 200;
  res.json({ success: true });
};
