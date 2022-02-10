import css from 'styled-jsx/css';

export default css`
  .balance-wrapper {
    margin-left: 37px;
    margin-top: 30px;
  }
  .row-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .title {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    margin-right: 10px;
    color: (--lighterBlack);
  }
  #total-value {
    font-family: Barlow;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.3px;
    color: var(--shark);
  }
  .extract {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: pre-line;
  }
  #extract-message {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    max-width: 25rem;
    color: var(--shark);
  }
  #extract-redirect {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    margin-right: 5px;
    color: var(--blue);
    cursor: pointer;
  }
`;