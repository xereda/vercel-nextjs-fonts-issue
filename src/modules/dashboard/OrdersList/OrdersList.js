import propTypes from 'prop-types';
import OrderCard from './OrderCard/OrderCard.js';

OrdersList.propTypes = {
  orders: propTypes.arrayOf(propTypes.shape({})),
};

OrdersList.defaultProps = {
  orders: [],
};

export default function OrdersList({ orders }) {
  return (
    <>
      <div className="order-table">
        {orders.map((order, index) => (
          <OrderCard {...{ order }} key={index} />
        ))}
      </div>
      <style jsx="true">{`
        .order-table {
          display: table;
          width: 100%;
        }
      `}</style>
    </>
  );
}
