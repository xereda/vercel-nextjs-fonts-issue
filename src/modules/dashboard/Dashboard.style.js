import css from 'styled-jsx/css';

export default css`
  .account-info {
    display: grid;
    grid-template-columns: 1fr 36rem;
    justify-content: space-between;
    border-bottom: 2px dotted #EBEBEB;
    height: 153px;
  }
  .filter-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 10px;
  }
  .orders-list {
    display: block;
    margin-top: 20px;
  }
`;