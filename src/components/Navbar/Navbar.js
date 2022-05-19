import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSessionState } from '@/store/index';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import style, { dropdownNotificationStyle } from './Navbar.style.js';

const Navbar = () => {
  const [session] = useSessionState();
  const groupAmount = session?.gruposEmpresa?.length;
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

  const menu = [
    {
      key: 0,
      label: <Link href="/permissao-acesso">Permissão de acesso</Link>,
    },
    { type: 'divider' },
    {
      key: 1,
      label: <Link href="/conversor">Converter arquivos</Link>,
    },
    { type: 'divider' },
    {
      key: 2,
      label: <Link href="/locais-entrega">Locais de entrega</Link>,
    },
    { type: 'divider' },
    {
      key: 3,
      label: <Link href="selecionar-grupo-empresa"><a>Trocar grupo ({groupAmount})</a></Link>,
      id: 'TROCAR_GRUPO',
    },
    {
      type: 'divider',
      id: 'TROCAR_GRUPO',
    },
    {
      key: 4,
      label: <Link href="/login">Sair</Link>,
    },
  ];

  const filteredMenu =
    groupAmount > 1 ? menu : menu.filter((item) => item.id !== 'TROCAR_GRUPO');

  const getClassNameForNavBarItem = (pathName) =>
    router.pathname === pathName ? 'active' : '';

  return (
    <>
      <nav className="navbar">
        <div className="wrapper-nav">
          <Image
            src="/svg/icon-ben.svg"
            alt="Ben Visa Vale"
            width={60}
            height={60}
          />
          <ul className="nav-links">
            <li
              className={getClassNameForNavBarItem('/dashboard')}
              id="nav-link"
            >
              <Link href="/dashboard">
                <a className="nav-link">Pedidos</a>
              </Link>
            </li>
            <li
              className={getClassNameForNavBarItem('/employees')}
              id="nav-link"
            >
              <Link href="/employees">
                <a className="nav-link">Gerenciar funcionários</a>
              </Link>
            </li>
            <li
              className={getClassNameForNavBarItem('/financial')}
              id="nav-link"
            >
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
            <Dropdown
              overlay={Options}
              trigger={['click']}
              arrow
              placement="bottomRight"
              overlayStyle={{ position: 'fixed' }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Avatar
                  className="bell-icon"
                  icon={<BellOutlined />}
                  shape="circle"
                  size="large"
                />
              </a>
            </Dropdown>
          </Badge>

          <Dropdown
            overlay={<Menu items={filteredMenu} />}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{ position: 'fixed' }}
          >
            <a role="dropdown" onClick={(e) => e.preventDefault()}>
              <Avatar
                icon={<UserOutlined />}
                shape="circle"
                size="large"
                style={{ backgroundColor: '#009CFF' }}
              />
            </a>
          </Dropdown>
        </div>
      </nav>
      <style jsx="true">{style}</style>
    </>
  );
};

export default Navbar;
