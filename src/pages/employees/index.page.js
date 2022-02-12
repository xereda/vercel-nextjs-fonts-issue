import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';

export default function Employees() {
  return (
    <PageContent
      title="Funcionários"
      onBack={() => window.history.back()}
    >
      <p>employees.js</p>
    </PageContent>
  );
}

Employees.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  );
};
