import { useRouter } from 'next/router';
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
import { findWaitingConfirmationOrders, useDashboard } from './services';

export default function Dashboard() {
  const router = useRouter();
  const [, setLoading] = useLoadingState();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const { data, hasError, isLoading, noData, status } = useDashboard({
    filterStatus,
    startDate,
    endDate,
    filterOrderId,
    page,
  });

  if (status === 401) {
    router.push('/login?userSessionTimeout=true');
  }

  const virtualBalance = data?.virtualBalance?.balanceValue;
  const useLimit = data?.useLimit;
  const orders = data?.orders;
  const totalItems = data?.totalItems;

  const resetPageNumber = () => {
    setPage(1);
  };

  useEffect(() => {
    resetPageNumber(1);
  }, [filterStatus, filterDate, filterOrderId]);

  const gotoWaitingConfirmationStatus = async () => {
    if (await findWaitingConfirmationOrders()) {
      setFilterStatus('AGUARDANDO_CONFIRMACAO');
    }
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    gotoWaitingConfirmationStatus();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              startDate={startDate}
              endDate={endDate}
              selectedOption={filterDate}
              onChange={setFilterDate}
              onChangeDates={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
            />
            <InputOptions
              placeholder="Buscar por"
              value={filterOrderId}
              options={[{ value: 'ID_PEDIDO', label: 'ID do pedido' }]}
              onType={setFilterOrderId}
            />
          </div>

          <div className="orders-list">
            <OrdersList {...{ orders }} />

            <div className="orders-pagination">
              <Pagination
                size="small"
                current={page}
                pageSize={DASHBOARD_TOTAL_ORDERS_PER_PAGE}
                total={totalItems}
                onChange={setPage}
              />
            </div>
          </div>

          <style jsx="true">{style}</style>
        </PageContent>
      </FeedbackPlaceholder>
    </Layout>
  );
}
