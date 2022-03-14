import css from 'styled-jsx/css';

export default css`
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 400px;
    margin-bottom: 4rem;
    padding-left: 5.5rem;
  }
  .fieldset {
    display: flex;
    flex-direction: column;
  }
  .fieldset label{
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    letter-spacing: -0.3px;
    margin-bottom: 7px;
    display: block;
  }
  .input-field {
    border-radius: 8px;
    border: 1px solid var(--dustyGrey);
    border-spacing: 0;
    border-collapse: separate;
    color: #333333;
    cursor: default;
    display: table;
    font-weight: 100;
    font-size: 14px;
    height: 40px;
    outline: none;
    overflow: hidden;
    padding: 0 25px 0 15px;
    width: 100%;
  }
  .input-field::placeholder {
    color: var(--mediumGrey);
  }
  .error-input {
    border: 1px solid var(--red);
    position: relative;
  }
  .error-input-icon {
    position: relative;
  }
  .error-input-icon:after {
    position: absolute;
    left: 90%;
    right: 0;
    bottom: 10px;
    content: "\d7";
    font-size: 12px;
    color: var(--red);
    text-align: center;
    width: 20px;
  }
  .success-input {
    border: 1px solid var(--green);
  }
  .success-input-icon {
    position: relative;
  }
  .success-input-icon:after {
    position: absolute;
    left: 90%;
    right: 0;
    bottom: 10px;
    content: "\2713";
    font-size: 12px;
    color: var(--green);
    text-align: center;
    width: 20px;
  }
  .error-message {
    color: var(--red);
    font-size: 13px;
    padding-top: 10px;
  }
  .password-recovery {
    margin: 0 auto;
  }
  .forgot-password {
    font-size: 16px;
    color: var(--red);
    cursor: pointer;
    background: none;
    border: 2px solid var(--white);
    text-transform: uppercase;
    font-weight: 700;
  }
  .integration-error {
    color: var(--darkRed);
    text-align: center;
    font-size: 16px;
  }
`;
