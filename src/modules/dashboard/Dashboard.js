import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
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
import FilterOrderDate from '@/components/FilterOrderDate/FilterOrderDate';

export default function Dashboard() {
  const [, setLoading] = useLoadingState();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const { data, hasError, isLoading, noData } = useDashboard({
    filterStatus,
    filterDate,
    page,
  });
  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;
  const totalItems = data?.totalItems;

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
            <FilterOrderDate
              status={filterDate}
              onClickFilter={setFilterDate}
            />
          </div>

          <div className="orders-list">
            <OrdersList {...{ orders }} />
          </div>

          <div className="orders-pagination">
            <Pagination
              size="small"
              current={page}
              pageSize={10}
              total={totalItems}
              onChange={setPage}
            />
          </div>

          <style jsx="true">{style}</style>
        </PageContent>
      </FeedbackPlaceholder>
    </Layout>
  );
}
