import CryptoJS, { AES } from 'crypto-js';
import Utf8 from 'crypto-js/enc-utf8';
import { Base64 } from 'js-base64';
import NodeRSA from 'node-rsa';

export default class Krypton {
  /**
   * Class needs to be receive a valid public key in PEM format.
   * The constructors creates the random AES secret to the instance and
   * the needed config AES mode config.
   */
  constructor(publicKey) {
    this.publicKey = this.formatPublicKey(publicKey);
    this.secret = this.getSecret();
    this.aesConfig = {
      mode: CryptoJS.mode.ECB,
    };
    this.rsaConfig = {
      environment: 'browser',
      encryptionScheme: {
        scheme: 'pkcs1',
        hash: 'md5',
      },
    };
  }

  /**
   * Encrypts both a data object and the AES key using the public key
   * and returns them in base64 encode.
   */
  async encrypt(data) {
    try {
      const formattedData =
        typeof data === 'object' ? JSON.stringify(data) : data;
      const encryptedData = AES.encrypt(
        formattedData,
        this.secret,
        this.aesConfig,
      ).toString();
      const encryptedKey = this.encryptSecret();
      return {
        encryptedData,
        encryptedKey: this.trimBase64(encryptedKey),
      };
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * Decrypt an encrypted AES Object using the Class instance key.
   */
  async decrypt(encrypted) {
    try {
      const decryptedData = JSON.parse(
        AES.decrypt(encrypted, this.secret, this.aesConfig).toString(Utf8),
      );

      const publicKey = decryptedData.publicKey
        ? this.formatPublicKey(decryptedData.publicKey)
        : '';
      return {
        ...decryptedData,
        publicKey,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  encryptSecret() {
    const RSA = new NodeRSA(this.publicKey, 'public', this.rsaConfig);
    const encrypted = RSA.encrypt(this.secret.toString(Utf8), 'base64');
    return encrypted;
  }

  /**
   * Encrypts a value based on timestamp using publicKey and returns in base64.
   * The RSA lib decode the base64, but the server expects to receive a base64,
   * that's the reason it's encoding twice.
   */
  generateHash(publicKey, timestamp) {
    const timestampBase64 = Base64.encode(timestamp);
    const RSA = new NodeRSA(publicKey, 'public', this.rsaConfig);
    const hash = RSA.encrypt(timestampBase64.toString(Utf8), 'base64');
    return this.trimBase64(hash);
  }

  /**
   * Returns random Secret needed to generate unique AES key.
   */
  generateSecret() {
    let keyText = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1)
      keyText += possible.charAt(Math.floor(Math.random() * possible.length));
    const secret = {
      key: Utf8.parse(keyText),
      timestamp: new Date().getTime(),
    };
    return secret;
  }

  /*
   * Checks if secret exists and if is valid and if not,
   * generates a new, random one.
   */
  getSecret() {
    let { secret } = this;
    if (!secret) {
      secret = this.generateSecret();
    }

    return secret.key;
  }

  /**
   * PublicKey needs to have line break after header and before footer.
   * This function replaces the header and footer with a new one with
   * appropriate line breaks.
   */
  formatPublicKey(pemKey) {
    const keyHeader = '-----BEGIN PUBLIC KEY-----';
    const keyFooter = '-----END PUBLIC KEY-----';
    const lineBreak = '\r\n';
    const formattedKey = pemKey
      .replace(keyHeader, `${keyHeader}${lineBreak}`)
      .replace(keyFooter, `${lineBreak}${keyFooter}`);
    return formattedKey;
  }

  /**
   * Removes any kind of line breaking or special character
   * that may cause problems in HTTP header requests.
   */
  trimBase64(base64) {
    return base64.replace(/(\r\n\t|\n|\r\t)/gm, '');
  }
}

export const makeKrypton = () => {
  const kryptonInstance = new Krypton(process.env.NEXT_PUBLIC_KRYPTON_KEY);

  const getOnlyNumbers = (string = '') => string.replace(/\D/g, '');

  const encrypt = async (cpf, password) => {
    const { encryptedKey, encryptedData } = await kryptonInstance.encrypt({
      cpf: getOnlyNumbers(cpf),
      password,
    });

    return [encryptedKey, encryptedData];
  };

  const decrypt = (responseData) => kryptonInstance.decrypt(responseData);

  return {
    encrypt,
    decrypt,
  };
};
