import Link from 'next/link';
import propTypes from 'prop-types';
import { useState } from 'react';
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
      <div className="order-row">
        <div className="order-column">
          <label className="order-label display-block">ID do pedido</label>
          <span className="order-value">{order.orderId}</span>
        </div>
        <div className="order-column">
          <label className="order-label display-block">Data de criação</label>
          <span className="order-value">{order.date}</span>
        </div>
        <div className="order-column">
          <label className="order-label display-block">
            Valor do benefício
          </label>
          <span className="order-value">{order.value}</span>
        </div>
        <div className="order-column">
          <label className="order-label display-block">Status do pedido</label>
          <DropdownButton
            label={order.status.label}
            color={order.status.color}
            hasAction={getDropdownActionRules().condition}
            handleAction={getDropdownActionRules().callback}
            labelAction={getDropdownActionRules().label}
          />
        </div>
        <div className="order-column">
          <label className="order-label display-block">
            Status de pagamento
          </label>
          <span
            className="order-value"
            style={{ color: `var(${order.paymentStatus.color})` }}
          >
            {order.paymentStatus.label}
          </span>
        </div>
        <div className="order-column">
          <Link href={`/pedido/${order.orderId}`}>
            <a className="order-link">Detalhe</a>
          </Link>
        </div>
      </div>
      <style jsx="true">{style}</style>
    </>
  );
}
