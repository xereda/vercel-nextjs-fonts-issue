import css from 'styled-jsx/css';

export default css`
  .feedback-success {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    max-width: 280px;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .message {
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    color: var(--grey);
  }
  .divider {
    background: var(--ligth-grey);
    height: 2px;
    border-radius: 1px;
    margin: 26px auto 52px;
    width: 80px;
  }
  .disclaimer {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.45px;
    margin-bottom: 5rem;
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
