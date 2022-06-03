import { saveCookie } from '@/utils/saveCookie';

export default async (req, res) => {
  await saveCookie({ res, rawCookie: req.body });

  res.statusCode = 200;
  res.json({ success: true });
};
