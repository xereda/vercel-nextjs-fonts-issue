import css from 'styled-jsx/css';

export default css`
  .order-row {
    display: table-row;
    background: var(--bds-color-white-gray);
    height: 78px;
  }
  .order-column {
    display: table-cell;
    font-size: 13px;
    vertical-align: middle;
    border-bottom: 8px solid white;
  }
  .order-column:first-child {
    padding-left: 40px;
    width: 200px;
  }
  .order-column:last-child {
    padding-right: 40px;
    width: 100px;
  }
  .order-label {
    text-align: left;
  }
  .order-value {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    overflow: hidden;
  }
  .order-link {
    font-size: 14px !important;
    font-weight: 600;
    color: var(--bds-color-blue);
  }
`;
