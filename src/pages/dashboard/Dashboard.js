import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import LimitChart from '@/components/LimitChart/LimitChart';
import VirtualAccount from '@/components/VirtualAccount/VirtualAccount';
import PaymentWarning from '@/components/PaymentWarning/PaymentWarning';
import OrdersList from './OrdersList/OrdersList';
import FeedbackPlaceholder from '@/components/FeedbackPlaceholder/FeedbackPlaceholder';
import { useSession } from '@/providers/index';
import style from './Dashboard.style';
import { useDashboard } from './services';

export default function Dashboard() {
  const { data, hasError, isLoading, noData } = useDashboard();

  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;

  return (
    <FeedbackPlaceholder {...{ isLoading, hasError, noData }}>
      <PageContent
        title="Histórico de pedidos"
      >
        {useSession().session}
        <div className="account-info">
          <LimitChart {...useLimit} />
          <VirtualAccount virtualBalance={virtualBalance} />
        </div>

        <div className="orders-list">
          <OrdersList {...{ orders }} />
        </div>

        <style jsx="true">{style}</style>
      </PageContent>
    </FeedbackPlaceholder>
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
