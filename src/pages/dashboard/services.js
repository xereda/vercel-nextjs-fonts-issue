import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const defaultOptions = { refreshInterval: 5000 };

const useDashboard = (options = defaultOptions) => {
  const { data, error } = useSWR('/api/dashboard', fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useDashboard };