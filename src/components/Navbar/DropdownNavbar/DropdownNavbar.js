import Link from 'next/link';
import { Divider, Menu } from 'antd';

export default function DropdownNavbar() {
  return (
    <Menu
      items={[
        {
          key: 0,
          label: <Link href="/permissao-acesso">Permissão de acesso</Link>,
        },
        { type: Divider },
        {
          key: 1,
          label: <Link href="/conversor">Converter arquivos</Link>,
        },
        { type: Divider },
        {
          key: 2,
          label: <Link href="/locais-entrega">Locais de entrega</Link>,
        },
        { type: Divider },
        {
          key: 3,
          label: <Link href="selecionar-grupo-empresa">Trocar grupo</Link>,
        },
        { type: Divider },
        {
          key: 4,
          label: <Link href="/login">Sair</Link>,
        },
      ]}
    />
  );
}
