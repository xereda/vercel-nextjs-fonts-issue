import css from 'styled-jsx/css';

export default css`
  .order-card {
    min-height: 75px;
    margin: auto auto 8px;
    display: grid;
    grid-template-columns: 130px 200px 150px 215px 250px 130px;
    justify-content: space-around;
    padding: 16px 8px;
    background: var(--white-f2);
    border-radius: 4px;
    position: relative;
  }
  .order-row {
    display: flex;
    gap: 4px;
    flex-direction: column;
    margin: auto;
    position: relative;
    font-size: 13px;
  }
  .order-content {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    overflow: hidden;
  }
  a, a:hover {
    color: var(--light-black);
  }
`;