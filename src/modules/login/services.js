import { httpClient } from '@/utils/services';

export const authenticate = ({
  cpf,
  password,
  onSuccess,
  onError,
  onFinally,
}) =>
  httpClient
    .post('/api/login', { cpf, password })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
