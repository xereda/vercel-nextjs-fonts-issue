import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';

import PageContent from '../components/PageContent';
import LimitChart from '../components/LimitChart/LimitChart';
import VirtualAccount from '../components/VirtualAccount/VirtualAccount';
import OrdersList from '../components/OrdersList/OrdersList';

export default function Home() {
  return (
    <PageContent
      title="Histórico de pedidos"
    >
      <div className="account-info">
        <LimitChart />
        <VirtualAccount />
      </div>

      <div className="orders-list">
        <OrdersList />
      </div>


      <style jsx>{`
        .account-info {
          display: grid;
          grid-template-columns: 1fr 36rem;
          justify-content: space-between;
          border-bottom: 2px dotted #EBEBEB;
          height: 153px;
        }
        .orders-list {
          display: block;
          margin-top: 20px;
        }
      `}</style>
    </PageContent>
  )
}
