import Aside from '@/modules/login/Aside.js';
import propTypes from 'prop-types';
import Footer from './Footer/Footer.js';

LayoutLogin.propTypes = {
  children: propTypes.node.isRequired,
};

export default function LayoutLogin({ children }) {
  return (
    <div className="layout">
      <Aside />
      <div className="container">{children}</div>

      <Footer />
      <style jsx="true">{`
        .container {
          padding: 65px 45px 0 45px;
          max-width: 640px;
          margin-left: 42vw;
        }
      `}</style>
    </div>
  );
}
