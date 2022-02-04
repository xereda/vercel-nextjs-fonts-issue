import { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CancelOrderModal from '@/components/CancelOrderModal/CancelOrderModal.js';
import style from './OrderCard.style.js';

export default function OrderCard() {
  const [showCancelModal, toggleCancelModal] = useState(false);

  const DropdownItems = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => toggleCancelModal(true)}>
          Cancelar pedido
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {showCancelModal &&
        <CancelOrderModal
          handleContinue={() => console.log('handleContinue')}
          handleCloseModal={() => toggleCancelModal(false)}
        />}
      <div className="order-card">
        <div className="order-row">
          <span>ID do Pedido</span>
          <span className="order-content">118349</span>
        </div>
        <div className="order-row">
          <span>Data de criação</span>
          <span className="order-content">04/01/2022 - 14:51:13</span>
        </div>
        <div className="order-row">
          <span>Valor do Benefício</span>
          <span className="order-content">R$ 2.600,00</span>
        </div>
        <div className="order-row">
          <span>Status do Pedido</span>
          <div>
            <Dropdown overlay={DropdownItems} trigger={['click']} arrow placement="bottomRight">
              <a onClick={e => e.preventDefault()} className="order-content">
                Concluído <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="order-row">
          <span>Status de Pagamento</span>
          <span className="order-content">Aguardando</span>
        </div>
        <div className="order-row">
          <Button type="link">Detalhe</Button>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}