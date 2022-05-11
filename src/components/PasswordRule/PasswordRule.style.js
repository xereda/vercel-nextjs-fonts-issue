import css from 'styled-jsx/css';

export default css`
  .label,
  .success-label,
  .error-label {
    margin-right: 35px;
    line-height: 22px;
    font-size: 14px;
    letter-spacing: -0.3px;
    text-transform: lowercase;
    font-style: normal;
  }
  .password-tips {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }
  .form-title {
    font-size: 16px;
  }
  .tip {
    margin: 2px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    white-space: nowrap;
    line-height: 22px;
  }
  .label {
    color: var(--bds-color-gray-light);
  }
  .error-label {
    color: var(--bds-color-red);
  }
  .success-label {
    color: var(--bds-color-green);
  }
`;
