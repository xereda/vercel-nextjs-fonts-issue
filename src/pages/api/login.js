import { decrypt, encrypt } from '@/utils/krypton';
import { httpClient } from '@/utils/services';

export default async function handler(req, res) {
  // await new Promise((r) => setTimeout(r, 5000));

  try {
    console.log(req?.body);
    const { cpf, password } = req?.body || { cpf: '', password: '' };

    const [apiKey, authorization] = await encrypt(cpf, password);

    const headers = {
      client_id: process.env.HEIMDALL_CLIENT,
      apiKey,
      authorization,
    };

    console.log({
      headers,
      AUTHENTICATION_PATH: process.env.AUTHENTICATION_PATH,
    });

    const response = await httpClient.post(
      process.env.AUTHENTICATION_PATH,
      null,
      { headers },
    );

    console.log('response: ', response.data);

    if (response?.data) {
      const descryptedData = await decrypt(response.data);

      res.status(200).json(descryptedData);
    }

    res.status(500).json({ error: 'ah para neh sula ' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Não foi possível efetuar o login do usuário' });
  }
}
