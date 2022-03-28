import css from 'styled-jsx/css';

export default css`
  .header {
    margin-bottom: 40px;
  }
  .title {
    font-weight: bold;
    font-size: 46px;
    text-transform: lowercase;
    line-height: normal;
  }
  .label {
    font-weight: 300;
    font-size: 27px;
    color: #666666;
    line-height: normal;
  }
  .term-content {
    max-height: 350px;
    overflow-y: scroll;
    margin: 30px 0 30px 0;
  }
  .term-footer {
    display: flex;
    justify-content: center;
    gap: 4rem;
    border-top: 1px solid rgba(155,155,155,0.3);
    padding: 32px 0 32px 0;
  }
  .cancel {
    font-size: 16px;
    color: var(--red);
    cursor: pointer;
    background: none;
    border: 2px solid var(--white);
    text-transform: uppercase;
    font-weight: 700;
  }
  .accept-term {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 2px solid var(--red);
    color: var(--white);
    background-color: var(--red);
  }    
  .accept-term:disabled {
    border: transparent;
    color: #A6A6A6;
    background-color: #E1E1E1;
    cursor: not-allowed;
  }   
  .error {
    color: var(--darkRed);
    text-align: center;
    font-size: 16px;
  }
`;