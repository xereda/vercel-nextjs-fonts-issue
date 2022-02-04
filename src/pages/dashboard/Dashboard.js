import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import LimitChart from '@/components/LimitChart/LimitChart';
import VirtualAccount from '@/components/VirtualAccount/VirtualAccount';
import PaymentWarning from '@/components/PaymentWarning/PaymentWarning';
import OrdersList from './OrdersList/OrdersList';
import style from './Dashboard.style';
import { useDashboard } from './services';

export default function Dashboard() {
  const { data, error, isLoading } = useDashboard();

  console.log({ data, isLoading, error });

  return (
    <PageContent
      title="Histórico de pedidos"
    >

      <div className="account-info">
        <LimitChart
          percentage={1}
          limiteBalance="R$ 99,00"
          usedLimit="R$ 1,00"
          totalLimit="R$ 100,00"
        />
        <VirtualAccount virtualBalance='R$ 1.000,00' />
      </div>

      <div className="orders-list">
        <OrdersList />
      </div>

      <style jsx="true">{style}</style>
    </PageContent>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout
      renderNotice={() => <PaymentWarning />}
    >
      {page}
    </Layout>
  );
};
