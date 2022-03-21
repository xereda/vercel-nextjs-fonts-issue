import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const httpClient = axios;

export const getErrorMessage = (e, defaultMessage) => {
  const error = {
    status: e?.response?.status || 500,
    message:
      e?.response?.data?.messages?.[0] ||
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.response?.data ||
      e?.message?.data ||
      e?.message,
  };

  if (e === 'INVALID_DATA_SESSION') {
    error.message = 'Não foi possível obter os dados da sessão';
  }

  if (!error.message) {
    error.message = defaultMessage;
  }

  return error;
};
