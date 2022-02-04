import css from 'styled-jsx/css';

export const dropdownNotificationStyle = css`
  .option-dropdown {
    background-color: var(--white);
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;  
  }
  .notification-msg, .notification-link {
    font-size: 13px;
  }
  .notification-link, .notification-link:hover {
    color: var(--blue);
  }
`;

export default css`
  .navbar {
    background-color: var(--navBarGrey);
    height: 98px;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .wrapper-nav {
    display: grid;
    grid-template-columns: 4rem 1fr 2.5rem 2.5rem;
    gap: 1.5rem;
    align-items: center;
    width: 76rem;
    margin: 0 auto;
  }
  .menu {
    background-color: var(--navBarGrey);
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
    color: var(--white);
    font-size: 16px;
    box-sizing: border-box;
    height: 94px;
    margin: 0px 15px;
    text-decoration: none;
    cursor: pointer;
  }
  .active { 
    border-bottom: 4px solid var(--red);
  }
  .bell-icon {
    background-color: var(--shark);
  }
  
`;