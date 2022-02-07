import PropTypes from 'prop-types';
import OrderCard from './OrderCard/OrderCard.js';

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({})),
};

OrdersList.defaultProps = {
  orders: [],
};

export default function OrdersList({ orders }) {

  return(
    <>
      {orders.map((order, index) => <OrderCard {...{order}} key={index} />)}
    </>
  );
}