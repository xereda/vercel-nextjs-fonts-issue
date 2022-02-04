import css from 'styled-jsx/css';

export default css`
  .primary-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 240px;
    height: 40px;
    margin-left: auto;
    font-size: 14px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 10px 1em;
    text-transform: uppercase;
    border: 2px solid var(--red);
    color: var(--white);
    background-color: var(--red);
    outline: none;
    line-height: normal;
    text-decoration: none;
  }
  
  .primary-btn:disabled {
    background-color: var(--mediumGrey);
    color: var(--dustyGrey);
    cursor: not-allowed;
    border: 2px solid var(--mediumGrey);
  }
`;
