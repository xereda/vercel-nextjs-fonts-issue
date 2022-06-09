import useSWR from 'swr';
import { fetcher, httpClient, makeUrlQueryString } from '@/utils/services';

const useDashboard = (apiFilters, options) => {
  const queryParams = makeUrlQueryString(apiFilters);

  const { data, error, mutate } = useSWR(
    `/api/dashboard?${queryParams}`,
    fetcher,
    {
      refreshInterval: 5000,
      ...options,
    },
  );

  const status = error?.response?.data?.error?.status;
  const hasError = !!error;

  return {
    data,
    isLoading: !error && !data,
    noData: !error && !data?.virtualBalance,
    hasError,
    error,
    status,
    mutate,
  };
};

const findWaitingConfirmationOrders = async () => {
  const response = await httpClient({
    method: 'get',
    url: '/api/orders?page=1&filterStatus=AGUARDANDO_CONFIRMACAO',
  });

  return response?.data?.totalItems > 0;
};

export { useDashboard, findWaitingConfirmationOrders };
