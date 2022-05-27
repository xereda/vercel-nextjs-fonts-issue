import css from 'styled-jsx/css';

export const dropdownNotificationStyle = css`
  .option-dropdown {
    background-color: var(--bds-color-white);
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .notification-msg,
  .notification-link {
    font-size: 13px;
  }
  .notification-link,
  .notification-link:hover {
    color: var(--bds-color-blue);
  }
`;

export default css`
  .navbar {
    background-color: var(--bds-color-gray-darker);
    height: 98px;
    position: sticky;
    top: 0;
    z-index: 9999;
  }
  .wrapper-nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    width: 76rem;
    margin: 0 auto;
  }
  .main-navigation {
    display: flex;
    gap: 2rem;
  }
  .menu {
    background-color: var(--bds-color-gray-darker);
    border: none;
  }
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--bds-color-white);
    font-size: 16px;
    box-sizing: border-box;
    height: 94px;
    margin: 0px 15px;
    text-decoration: none;
    cursor: pointer;
  }
  .active {
    border-bottom: 4px solid var(--bds-color-red);
  }
  .dropdown-navigation {
    display: flex;
    gap: 1rem;
  }
  .bell-icon {
    background-color: var(--bds-color-black-lighter);
  }
`;
