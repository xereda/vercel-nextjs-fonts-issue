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