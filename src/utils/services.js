import axios from 'axios';
import { stripTags } from '@/utils/string';

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

  if (e === 'UNAUTHORIZED') {
    error.status = 401;
    error.message =
      '[UNAUTHORIZED] - Não foi possível obter os dados da sessão do usuário';
  }

  if (!error.message) {
    error.message = defaultMessage || e;
  }

  error.message = stripTags(error.message);

  return error;
};

export const makeUrlQueryString = (queries = {}) => {
  if (typeof queries !== 'object' || !queries) {
    return '';
  }

  return Object.keys(queries).reduce((acc, cur) => {
    if (queries[cur]) {
      acc = `${acc}${cur}=${queries[cur]}&`;
    }

    return acc;
  }, '');
};

export const paginate = (paginationProps = {}) => {
  if (!paginationProps?.array?.[0]) {
    return [];
  }

  const { array, pageNumber, pageSize } = paginationProps;

  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
