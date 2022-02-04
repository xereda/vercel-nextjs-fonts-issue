import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import style from './Layout.style.js';

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  renderNotice: PropTypes.func,
};

Layout.defaultProps = {
  renderNotice: () => null,
};

export default function Layout ({ children, renderNotice }) {

  return (
    <div className="layout">
      <Navbar />

      {renderNotice()}

      <div className="container">
        {children}
      </div>

      <style jsx="true">{style}</style>
    </div>
  );
};
