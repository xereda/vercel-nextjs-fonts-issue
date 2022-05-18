import propTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import style from './Layout.style.js';
import { useRouter } from 'next/router';

Layout.propTypes = {
  children: propTypes.node.isRequired,
  renderNotice: propTypes.func,
};

Layout.defaultProps = {
  renderNotice: () => null,
};

export default function Layout({ children, renderNotice }) {
  const router = useRouter();

  return (
    <div className="layout">
      <Navbar />

      {renderNotice()}

      <div
        className={router.pathname === '/selecionar-grupo-empresa'
          ? 'outside container' : 'container'}
      >
        {children}
      </div>

      <style jsx="true">{style}</style>
    </div>
  );
}
