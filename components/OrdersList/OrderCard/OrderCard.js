import global from './OrderCard.style.js';
import { useState } from 'react';
import { Dropdown } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import GhostButton from '../../GhostButton.js';
import CancelOrderModal from '../../CancelOrderModal.js';

export default function OrderCard() {

  const option = (
    <div className="optionDropdown">
      <CancelOrderModal />
      <style jsx global>
        { global }
      </style>
    </div>
  );
  
  return (
    <>
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
            <Dropdown overlay={option} trigger={['click']} arrow placement="bottomRight">
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
          <GhostButton>Detalhe</GhostButton>
        </div>

        <style jsx global>
          { global }
        </style>
      </div>
    </>
  )
}