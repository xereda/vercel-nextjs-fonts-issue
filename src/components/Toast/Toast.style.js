import css from 'styled-jsx/css';

export default css`
  @keyframes slidein {
    from {
      opacity: 0;
      bottom: -30px;
    }

    to {
      opacity: 1;
      bottom: 0;
    }
  }

  .toast-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 30px 40px;
  }

  .toast-message {
    position: relative;
    bottom: 0;
    animation-name: slidein;
    animation-duration: 0.7s;
    background-color: var(--bds-color-gray);
    border-radius: 4px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    font-weight: 700;
    font-size: 18px;
    color: white;
    user-select: none;
    padding: 15px;
  }
`;
