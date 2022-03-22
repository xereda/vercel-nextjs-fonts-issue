import useSWR from 'swr';
import { fetcher } from '@/utils/services';

const useDashboard = () => {
  const { data, error } = useSWR('/api/dashboard', fetcher, {
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
