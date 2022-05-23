import useSWR from 'swr';
import { fetcher, makeUrlQueryString } from '@/utils/services';

const useDashboard = (apiFilters = {}) => {
  const queryParams = makeUrlQueryString(apiFilters);

  const { data, error } = useSWR(`/api/dashboard?${queryParams}`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    data,
    isLoading: !error && !data,
    hasError: !!error,
    noData: !error && !data?.virtualBalance,
  };
};

export { useDashboard };
