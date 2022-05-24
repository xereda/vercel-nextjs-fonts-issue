import css from 'styled-jsx/css';

export default css`
  .chart-container {
    display: flex;
    padding: 40px 20px 24px 0;
    margin: 0 0 32px;
  }
  .chart-wrapper {
    width: 80px;
    height: 80px;
    position: relative;
  }
  .chart-transform {
    transform: rotate(135deg);
  }
  #chart-percentage {
    position: absolute;
    left: 20px;
    top: 35px;
    width: 45px;
    font-weight: 700;
    font-size: 1.1em;
    text-align: center;
    letter-spacing: 0.1;
  }
  .label {
    position: absolute;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.1px;
    color: var(--bds-color-black);
    top: 80px;
    left: 18px;
  }
  .description {
    display: flex;
    flex-direction: column;
    margin: auto 18px;
  }
  #chart-limit {
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 0.1px;
    color: var(--bds-color-red);
  }
  #chart-available-value {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.3px;
    color: (--bds-color-black-light);
  }
  #chart-desc {
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.1px;
    color: var(--bds-color-gray-medium);
  }
  #used-value {
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.1px;
  }
  #total {
    color: var(--bds-color-black);
  }
`;
