import css from 'styled-jsx/css';

export default css`
  a, a:hover {
    color: var(--light-black);
  }
  .warning-icon {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-header-title {
    font-weight: 600;
    line-height: 26px;
    font-size: 16px;
    text-align: center
  }
  .modal-content {
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.1px;
  }
`;