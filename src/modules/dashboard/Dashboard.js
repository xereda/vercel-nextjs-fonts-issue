import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useLoadingState } from '@/store/index';
import { DASHBOARD_TOTAL_ORDERS_PER_PAGE } from '@/utils/constants';
import Layout from '@/components/Layout/Layout';
import PageContent from '@/components/PageContent/PageContent';
import LimitChart from '@/components/LimitChart/LimitChart';
import VirtualAccount from '@/components/VirtualAccount/VirtualAccount';
import PaymentWarning from '@/components/PaymentWarning/PaymentWarning';
import FeedbackPlaceholder from '@/components/FeedbackPlaceholder/FeedbackPlaceholder';
import FilterOrderStatus from '@/components/FilterOrderStatus/FilterOrderStatus';
import FilterOrderDate from '@/components/FilterOrderDate/FilterOrderDate';
import InputOptions from '@/components/InputOptions/InputOptions';
import OrdersList from './OrdersList/OrdersList';
import style from './Dashboard.style';
import { useDashboard } from './services';

export default function Dashboard() {
  const [, setLoading] = useLoadingState();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');

  const { data, hasError, isLoading, noData } = useDashboard({
    filterStatus,
    filterDate,
    filterOrderId,
    page,
  });
  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;
  const totalItems = data?.totalItems;

  const resetPageNumber = () => {
    setPage(1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLoading(false), []);

  useEffect(
    () => resetPageNumber(1),
    [filterStatus, filterDate, filterOrderId],
  );

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
            <InputOptions
              placeholder="Buscar por"
              value={filterOrderId}
              options={[{ value: 'ID_PEDIDO', label: 'Id do pedido' }]}
              onType={setFilterOrderId}
            />
          </div>

          <div className="orders-list">
            <OrdersList {...{ orders }} />
          </div>

          <div className="orders-pagination">
            <Pagination
              size="small"
              current={page}
              pageSize={DASHBOARD_TOTAL_ORDERS_PER_PAGE}
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
