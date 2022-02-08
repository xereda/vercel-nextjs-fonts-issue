import propTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import style from './Layout.style.js';

Layout.propTypes = {
  children: propTypes.node.isRequired,
  renderNotice: propTypes.func,
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
