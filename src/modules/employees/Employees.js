import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';

export default function Employees() {
  return (
    <Layout>
      <PageContent title="Funcionários" onBack={() => window.history.back()}>
        <h1>employees.js</h1>
      </PageContent>
    </Layout>
  );
}
