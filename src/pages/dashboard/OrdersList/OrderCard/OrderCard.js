import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CancelOrderModal from '@/components/CancelOrderModal/CancelOrderModal.js';
import style from './OrderCard.style.js';

OrderCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    status: PropTypes.shape({
      enum: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
    paymentStatus: PropTypes.shape({
      enum: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default function OrderCard({ order }) {
  const [showCancelModal, toggleCancelModal] = useState(false);

  const DropdownItems = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => toggleCancelModal(true)}>
          Cancelar pedido
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {showCancelModal &&
        <CancelOrderModal
          handleContinue={() => console.log('handleContinue')}
          handleCloseModal={() => toggleCancelModal(false)}
        />}
      <div className="order-card">
        <div className="order-row">
          <span>Id do pedido</span>
          <span className="order-content">{order.orderId}</span>
        </div>
        <div className="order-row">
          <span>Data de criação</span>
          <span className="order-content">{order.date}</span>
        </div>
        <div className="order-row">
          <span>Valor do benefício</span>
          <span className="order-content">{order.value}</span>
        </div>
        <div className="order-row">
          <span>Status do pedido</span>
          <div>
            <Dropdown overlay={DropdownItems} trigger={['click']} arrow placement="bottomRight">
              <a onClick={e => e.preventDefault()} className="order-content">
                {order.status.label} <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="order-row">
          <span>Status de pagamento</span>
          <span className="order-content">{order.paymentStatus.label}</span>
        </div>
        <div className="order-row">
          <Button type="link">Detalhe</Button>
        </div>
      </div>
      <style jsx="true">{style}</style>
    </>
  );
}