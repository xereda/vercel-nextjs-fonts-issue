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
  .update-form {
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
    border: 1px solid var(--bds-color-gray-medium);
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
    color: var(--bds-color-gray-lighter);
  }
  .error-input {
    border: 1px solid var(--bds-color-red);
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
    color: var(--bds-color-red);
    text-align: center;
    width: 20px;
  }
  .success-input {
    border: 1px solid var(--bds-color-green);
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
    color: var(--bds-color-green);
    text-align: center;
    width: 20px;
  }
  .error-message {
    color: var(--bds-color-red);
    font-size: 13px;
    padding-top: 10px;
  }
  .error {
    color: var(--bds-color-red-error-text);
    text-align: center;
    font-size: 16px;
  }
`;
