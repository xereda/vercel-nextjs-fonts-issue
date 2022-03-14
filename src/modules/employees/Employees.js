import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import { useSessionDispatch, useSessionStore } from '@/providers/index';

export default function Employees() {
  const dispatch = useSessionDispatch();
  const { session } = useSessionStore();

  const handleResetState = () =>
    dispatch({
      type: 'RESET_STATE',
    });

  return (
    <PageContent title="Funcionários" onBack={() => window.history.back()}>
      <h1>employees.js</h1>
      <h2>{JSON.stringify(session)}</h2>
      <button onClick={handleResetState}>RESET STATE</button>
    </PageContent>
  );
}

Employees.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
