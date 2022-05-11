import css from 'styled-jsx/css';

export default css`
  .login-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--bds-color-gray-light);
    padding-top: 16px;
    max-width: 550px;
    margin-left: 45vw;
  }
  .ben-info {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 65%;
  }
  .ben-info h3 {
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    text-transform: uppercase;
  }
  .ben-info span {
    font-size: 13px;
    line-height: 12px;
    color: #666666;
  }
  .bg-footer {
    display: block;
    width: 100%;
    margin-top: 16px;
    height: 32px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: url(/png/bg-login-footer.png) no-repeat;
    max-width: 550px;
    margin-left: 45vw;
  }
`;
