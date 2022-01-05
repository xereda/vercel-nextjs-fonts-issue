import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function DropdownNavbar() { 
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">Permissão de Acesso</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="#">Converter arquivos</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="#">Locais de Entrega</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        <a>Sair</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" overlayStyle={{position: "fixed"}}>
      <a onClick={e => e.preventDefault()}>
        <Avatar icon={<UserOutlined />} shape="circle" size="large" style={{backgroundColor: "#009CFF"}}/>
      </a>
    </Dropdown>
  )
}