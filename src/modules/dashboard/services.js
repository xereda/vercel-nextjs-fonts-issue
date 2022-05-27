import useSWR from 'swr';
import { fetcher, makeUrlQueryString } from '@/utils/services';

const useDashboard = (apiFilters = {}) => {
  const queryParams = makeUrlQueryString(apiFilters);

  const { data, error } = useSWR(`/api/dashboard?${queryParams}`, fetcher, {
    refreshInterval: 5000,
  });

  const status = error?.response?.data?.error?.status;
  const hasError = !!error;

  return {
    data,
    isLoading: !error && !data,
    noData: !error && !data?.virtualBalance,
    hasError,
    error,
    status,
  };
};

export { useDashboard };
