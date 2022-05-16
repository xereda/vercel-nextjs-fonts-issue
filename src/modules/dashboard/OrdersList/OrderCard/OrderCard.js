import propTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'antd';
import CancelOrderModal from '@/components/CancelOrderModal/CancelOrderModal';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import style from './OrderCard.style.js';

OrderCard.propTypes = {
  order: propTypes.shape({
    orderId: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    canCancel: propTypes.bool.isRequired,
    status: propTypes.shape({
      enum: propTypes.string.isRequired,
      label: propTypes.string.isRequired,
      color: propTypes.string.isRequired,
    }),
    paymentStatus: propTypes.shape({
      enum: propTypes.string.isRequired,
      label: propTypes.string.isRequired,
      color: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default function OrderCard({ order }) {
  const [showCancelModal, toggleCancelModal] = useState(false);

  const getDropdownActionRules = () => {
    if (order.status.enum === 'INVALIDADO') {
      return {
        condition: true,
        callback: () => console.log('ver inconsistências...'),
        label: 'Ver inconsistências',
      };
    }

    return {
      condition: order.canCancel,
      callback: toggleCancelModal,
      label: 'Cancelar pedido',
    };
  };

  return (
    <>
      {showCancelModal && (
        <CancelOrderModal
          handleContinue={() => console.log('handleContinue')}
          handleCloseModal={() => toggleCancelModal(false)}
        />
      )}
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
            <DropdownButton
              label={order.status.label}
              color={order.status.color}
              hasAction={getDropdownActionRules().condition}
              handleAction={getDropdownActionRules().callback}
              labelAction={getDropdownActionRules().label}
            />
          </div>
        </div>
        <div className="order-row">
          <span>Status de pagamento</span>
          <span
            className="order-content"
            style={{ color: `var(${order.paymentStatus.color})` }}
          >
            {order.paymentStatus.label}
          </span>
        </div>
        <div className="order-row">
          <Button type="link">Detalhe</Button>
        </div>
      </div>
      <style jsx="true">{style}</style>
    </>
  );
}
