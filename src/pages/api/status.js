export default async function handler(req, res) {
  try {
    console.log(req.body);

    res.status(200).json({});
  } catch (e) {
    const error =
      e?.response?.data?.messages?.[0] ||
      'Não foi possível obter os dados do cpf';
    const status = e?.response?.status || 500;

    res.status(status).json({ error });
  }
}
