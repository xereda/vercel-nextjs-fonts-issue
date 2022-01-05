import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from 'react';

import { Badge, Avatar, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';

import global from './Navbar.style.js'
import DropdownNavbar from '../DropdownNavbar.js';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const option = (
    <div className="optionDropdown">
      <p className="notification-msg">Seu contrato foi atualizado</p>
      <a className="notification-link">Clique aqui para atualizar</a>
      <style jsx global>
        { global }
      </style>
    </div>
  );

  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="wrapper-nav">
        <Image src="/svg/icon-ben.svg" alt="Ben Visa Vale" width={60} height={60} />
        <ul className="nav-links">
          <li className={router.pathname == "/" ? "active" : ""} id="nav-link">
            <Link href="/">
              Pedidos
            </Link>
          </li>
          <li className={router.pathname == "/employees" ? "active" : ""} id="nav-link">
            <Link href="/employees">
              Gerenciar funcionários
            </Link>
          </li>
          <li className={router.pathname == "/financial" ? "active" : ""} id="nav-link">
            <Link href="/financial">
              Financeiro
            </Link>
          </li>
          <li className={router.pathname == "/reports" ? "active" : ""} id="nav-link">
            <Link href="/reports">
              Relatórios
            </Link>
          </li>
        </ul>

        <Badge count={1} size="small">
          <Dropdown overlay={option} trigger={['click']} arrow placement="bottomRight" overlayStyle={{position: "fixed"}}>
            <a onClick={e => e.preventDefault()}>
              <Avatar className="user-avatar" icon={<BellOutlined />} shape="circle" size="large" />
            </a>
          </Dropdown>
        </Badge>

        <DropdownNavbar />
              
      <style jsx global>
        { global }
      </style>
      </div>
    </nav>
  )
}

export default Navbar;