import css from 'styled-jsx/css';

export default css`
  .layout {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 18px;
    background: var(--bds-color-black) url(/png/bg.png) no-repeat left bottom;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 79rem;
    padding: 20px 10px;
    margin: 0 auto;
    background-color: var(--bds-color-white);
    border-radius: 6px;
    overflow: hidden;
    height: 100%;
  }
  .outside {
    background-color: transparent;
  }
  .wrapper-header {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 24px;
    border-bottom: 0px;
  }
`;
