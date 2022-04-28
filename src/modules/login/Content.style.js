import css from 'styled-jsx/css';

export default css`
  .login-header {
    margin-bottom: 40px;
  }
  .title {
    font-weight: bold;
    font-size: 56px;
    text-transform: lowercase;
    margin: 0 0 8px;
    padding: 0;
  }
  .subtitle {
    font-weight: 300;
    font-size: 32px;
    letter-spacing: 0.3px;
    text-transform: lowercase;
    color: var(--green);
    padding: 0;
    margin: 0 0 40px 0px;
  }
  .label {
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.24px;
    color: #2e2f30;
    margin: 0;
    max-width: 34rem;
  }
  .social-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 40px 0;
    padding-left: 3rem;
    max-width: 30rem;
  }
  .establishment-area {
    text-align: right;
    padding-right: 2rem;
    border-right: 1px solid var(--ligth-grey);
  }
  .establishment-area h1, .costumer-area h1 {
    font-weight: 300;
    font-size: 26px;
    line-height: 29px;
    text-transform: uppercase;
    margin: 0;
    font-family: Barlow, sans-serif;
  }
  .establishment-area h2, .costumer-area h2 {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    text-transform: lowercase;
    margin: 0;
    font-family: Barlow, sans-serif;
    }
  .establishment-area p, .costumer-area p {
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 21px;
    padding-top: 14px;
    letter-spacing: 0.3px;
    font-family: Open Sans, serif;
  }
  .establishment-area p a {
    color: var(--blue);
    text-decoration: underline;
    font-weight: 600;
  }
  .costumer-area p span {
    color: var(--red);
    font-weight: 600;
  }
  .app-download {
    display: flex;
    gap: 6px;
  }
`;