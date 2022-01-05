import css from 'styled-jsx/css'

export default css.global`
  .warning {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin: 2rem auto;
    padding: 0 1.5rem;
    min-height: 114px;
    background-color: var(--yellow);
    border-radius: 4px;
    position: relative;
    width: 79rem;
  }
  .close-warning {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -16px;
    top: -16px;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background: var(--white);
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 10px;
    cursor: pointer;
  }
  .icon-warning {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 74px;
    height: 74px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
  .content {
    font-size: 16px;
    color: var(--darkGrey);
    margin-left: 26px;
    margin-right: 45px;
    
  }
`