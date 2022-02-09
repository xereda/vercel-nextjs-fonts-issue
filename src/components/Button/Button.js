import propTypes from 'prop-types';

Button.propTypes = {
  children: propTypes.node.isRequired,
  isFullWidth: propTypes.bool,
};

Button.defaultProps = {
  isFullWidth: false,
};

export default function Button({ children, ...props }) {
  const { isFullWidth, ...rest } = props;

  return (
    <>
      <button
        {...rest}
        className="primary-btn"
      >
        {children}
      </button>

      <style jsx="true">{`
        .primary-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: ${isFullWidth ? '100%' : '240px'};
          height: 40px;
          margin-left: auto;
          font-size: 14px;
          cursor: pointer;
          border-radius: 8px;
          font-weight: bold;
          letter-spacing: 1px;
          padding: 10px 1em;
          text-transform: uppercase;
          border: 2px solid var(--red);
          color: var(--white);
          background-color: var(--red);
          outline: none;
          line-height: normal;
          text-decoration: none;
        }

        .primary-btn:disabled {
          background-color: var(--mediumGrey);
          color: var(--dustyGrey);
          cursor: not-allowed;
          border: 2px solid var(--mediumGrey);
        }
      `}</style>
    </>
  );
}
