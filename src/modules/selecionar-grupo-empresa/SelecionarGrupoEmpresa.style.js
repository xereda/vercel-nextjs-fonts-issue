import css from 'styled-jsx/css';

export default css`
  a, a:hover {
    color: var(--light-black);
  }
  .modal-header-title {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 40px;
    text-align: center;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    max-height: 270px;
    overflow: auto;
  }
  .group-item {
    background-color: var(--bds-color-white-gray);
    color: var(--bds-color-blue);
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 26px;
    margin: 1px 0px;
    padding: 24px;
    user-select: none;
    align-items: center;
    border: 0;
  }
  .group-item:disabled {
    cursor: not-allowed;
    color: var(--bds-color-gray);
  }
  .error {
    color: var(--bds-color-red-error-text);
    text-align: center;
    font-size: 14px;
  }
`;