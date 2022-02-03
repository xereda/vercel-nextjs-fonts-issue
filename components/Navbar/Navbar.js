import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Badge, Avatar, Dropdown } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

import DropdownNavbar from './DropdownNavbar/DropdownNavbar.js';
import style, { dropdownNotificationStyle } from './Navbar.style.js';

const Navbar = () => {
  const router = useRouter();

  const Options = (
    <>
      <div className="option-dropdown">
        <p className="notification-msg">Seu contrato foi atualizado</p>
        <a className="notification-link">Clique aqui para atualizar</a>
      </div>

      <style jsx="true">{dropdownNotificationStyle}</style>
    </>
  );

  const getClassNameForNavBarItem = pathName => router.pathname === pathName ? 'active' : '';

  return (
    <>
      <nav className="navbar">
        <div className="wrapper-nav">
          <Image src="/svg/icon-ben.svg" alt="Ben Visa Vale" width={60} height={60} />
          <ul className="nav-links">
            <li className={getClassNameForNavBarItem('/')} id="nav-link">
              <Link href="/">
                <a className="nav-link">Pedidos</a>
              </Link>
            </li>
            <li className={getClassNameForNavBarItem('/employees')} id="nav-link">
              <Link href="/employees">
                <a className="nav-link">Gerenciar funcionários</a>
              </Link>
            </li>
            <li className={getClassNameForNavBarItem('/financial')} id="nav-link">
              <Link href="/financial">
                <a className="nav-link">Financeiro</a>
              </Link>
            </li>
            <li className={getClassNameForNavBarItem('/reports')} id="nav-link">
              <Link href="/reports">
                <a className="nav-link">Relatórios</a>
              </Link>
            </li>
          </ul>

          <Badge count={1} size="small">
            <Dropdown overlay={Options} trigger={['click']} arrow placement="bottomRight" overlayStyle={{position: 'fixed'}}>
              <a onClick={e => e.preventDefault()}>
                <Avatar className="bell-icon" icon={<BellOutlined />} shape="circle" size="large" />
              </a>
            </Dropdown>
          </Badge>

          <Dropdown overlay={DropdownNavbar} trigger={['click']} placement="bottomRight" overlayStyle={{position: 'fixed'}}>
            <a onClick={e => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} shape="circle" size="large" style={{backgroundColor: '#009CFF'}}/>
            </a>
          </Dropdown>

        </div>
      </nav>
      <style jsx="true">{style}</style>
    </>
  );
};

export default Navbar;