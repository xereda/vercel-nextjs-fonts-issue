import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { loadingStore, persistSession, sessionStore } from '@/store/index';
import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import LimitChart from '@/components/LimitChart/LimitChart';
import VirtualAccount from '@/components/VirtualAccount/VirtualAccount';
import PaymentWarning from '@/components/PaymentWarning/PaymentWarning';
import OrdersList from './OrdersList/OrdersList';
import FeedbackPlaceholder from '@/components/FeedbackPlaceholder/FeedbackPlaceholder';
import style from './Dashboard.style';
import { useDashboard } from './services';

export default function Dashboard() {
  const { data, hasError, isLoading, noData } = useDashboard();
  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;
  const session = useState(sessionStore);

  const loading = useState(loadingStore);

  persistSession(session);

  useEffect(() => {
    if (!isLoading && loading?.value) {
      loading?.set(false);
    }
  }, [isLoading, loading]);

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

          <div className="orders-list">
            <OrdersList {...{ orders }} />
          </div>

          <style jsx="true">{style}</style>
        </PageContent>
      </FeedbackPlaceholder>
    </Layout>
  );
}
