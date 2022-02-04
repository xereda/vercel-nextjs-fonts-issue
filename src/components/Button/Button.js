import PropTypes from 'prop-types';
import style from './Button.style';

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Button({ children }) {
  return (
    <>
      <button className="primary-btn">{children}</button>

      <style jsx="true">{style}</style>
    </>
  );
}
