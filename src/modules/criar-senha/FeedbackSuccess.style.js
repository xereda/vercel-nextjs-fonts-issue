import css from 'styled-jsx/css';

export default css`
  .feedback-success {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    max-width: 450px;
    margin: 0 auto;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  .message {
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: 300;
    font-size: 2rem;
    line-height: 30px;
    color: var(--grey);
    margin-top: 3rem;
  }
  .disclaimer {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.45px;
    margin: 2rem 0 5rem 0;
  }
  .back-to-login {
    font-size: 16px;
    color: var(--red);
    cursor: pointer;
    background: none;
    border: 2px solid var(--white);
    text-transform: uppercase;
    font-weight: 700;
  }
`;
