import Layout from '@/components/Layout/Layout';
import { useSWRConfig } from 'swr';

export default function Employees() {
  const { cache } = useSWRConfig();

  return (
    <Layout>
      <h1>employees</h1>
      <button
        style={{ width: '300px' }}
        onClick={() => {
          cache.get('/api/dashboard');
          cache.clear();
        }}
      >
        LIMPAR CACHE DO SWR
      </button>
    </Layout>
  );
}
