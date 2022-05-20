import { useEffect, useState } from 'react';
import { useLoadingState } from '@/store/index';
import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import LimitChart from '@/components/LimitChart/LimitChart';
import VirtualAccount from '@/components/VirtualAccount/VirtualAccount';
import PaymentWarning from '@/components/PaymentWarning/PaymentWarning';
import OrdersList from './OrdersList/OrdersList';
import FeedbackPlaceholder from '@/components/FeedbackPlaceholder/FeedbackPlaceholder';
import style from './Dashboard.style';
import { useDashboard } from './services';
import FilterOrderStatus from '@/components/FilterOrderStatus/FilterOrderStatus';

export default function Dashboard() {
  const [, setLoading] = useLoadingState();
  const [filterStatus, setFilterStatus] = useState('');

  const { data, hasError, isLoading, noData } = useDashboard({ filterStatus });
  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLoading(false), []);

  return (
    <Layout renderNotice={() => <PaymentWarning />}>
      <FeedbackPlaceholder
        {...{ isLoading, hasError, noData, minHeight: '400px' }}
      >
        <PageContent title="Histórico de pedidos">
          <div className="account-info">
            <LimitChart {...useLimit} />
            <VirtualAccount virtualBalance={virtualBalance} />
          </div>

          <div className="filter-section">
            <FilterOrderStatus
              status={filterStatus}
              onClickFilter={setFilterStatus}
            />
          </div>

          <div className="orders-list">
            <OrdersList {...{ orders }} />
          </div>

          <style jsx="true">{style}</style>
        </PageContent>
      </FeedbackPlaceholder>
    </Layout>
  );
}
