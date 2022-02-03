import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import PaymentWarning from '../../pages/dashboard/PaymentWarning';
import style from './Layout.style.js';

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Layout ({ children }) {

  const router = useRouter();

  return (
    <div className="layout">
      <Navbar />

      {router.pathname == '/' && (
        <PaymentWarning />
      )}

      <div className="container">
        {children}
      </div>

      <style jsx="true">{style}</style>
    </div>
  );
};
