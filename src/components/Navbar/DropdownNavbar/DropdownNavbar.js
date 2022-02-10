import Link from 'next/link';
import { Menu } from 'antd';

export default function DropdownNavbar() {

  return (
    <Menu>
      <Menu.Item key="0">
        <Link href="/permissao-acesso">Permissão de acesso</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link href="/conversor">Converter arquivos</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link href="/locais-entrega">Locais de entrega</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link href="/login">Sair</Link>
      </Menu.Item>
    </Menu>
  );
}