import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const defaultOptions = { refreshInterval: 5000 };

const useDashboard = (options = defaultOptions) => {
  const { data, error } = useSWR('/api/dashboard', fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    hasError: !!error,
    noContent: !error && !data?.virtualBalance,
  };
};

export { useDashboard };