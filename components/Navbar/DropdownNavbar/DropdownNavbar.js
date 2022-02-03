import { Menu } from 'antd';

export default function DropdownNavbar() {

  return (
    <Menu>
      <Menu.Item key="0">
        <a href="/permissao-acesso">Permissão de acesso</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="/conversor">Converter arquivos</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a href="/locais-entrega">Locais de entrega</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="/login">Sair</a>
      </Menu.Item>
    </Menu>
  );
}