import css from 'styled-jsx/css';

export default css`
  .account-info {
    display: grid;
    grid-template-columns: 1fr 36rem;
    justify-content: space-between;
    border-bottom: 2px dotted var(--bds-color-gray-extralight);
    height: 153px;
  }
  .filter-section {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  .orders-list {
    display: block;
    margin-top: 20px;
  }
  .orders-pagination {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
