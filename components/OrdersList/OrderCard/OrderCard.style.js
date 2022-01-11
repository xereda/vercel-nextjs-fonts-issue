import css from 'styled-jsx/css'

export default css.global`
  .order-card {
    min-height: 75px;
    margin: auto auto 8px;
    display: grid;
    grid-template-columns: 130px 200px 150px 215px 250px 130px;
    justify-content: space-around;
    padding: 8px;
    background: var(--whiteF2);
    position: relative;
  }
  .order-row {
    display: flex;
    gap: 4px;
    flex-direction: column;
    margin: auto;
    position: relative;
  }
  a, a:hover {
    color: var(--lightBlack);
  }
`