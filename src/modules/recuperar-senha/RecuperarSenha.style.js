import css from 'styled-jsx/css';

export default css`
  .header {
    margin-bottom: 40px;
  }
  .title {
    font-weight: bold;
    font-size: 56px;
    text-transform: lowercase;
    line-height: 1;
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
    font-weight: 400;
    font-size: 17px;
    color: #666666;
    line-height: normal;
  }
  .recover-password-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 300px;
    margin-bottom: 4rem;
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .fieldset {
    display: flex;
    flex-direction: column;
  }
  .last-field {
    margin-bottom: 2rem;
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
    border: 1px solid var(--dusty-grey);
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
    color: var(--medium-grey);
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
  .error {
    color: var(--dark-red);
    text-align: center;
    font-size: 16px;
  }
`;
