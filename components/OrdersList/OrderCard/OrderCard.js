import global from './OrderCard.style.js';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function OrderCard() {

  const option = (
    <div className="optionDropdown">
      <a className="cancel-order">Cancelar Pedido</a>
      <style jsx global>
        { global }
      </style>
    </div>
  );
  
  return(
    <div className="order-card">
      <div className="order-row">
        <span>ID do Pedido</span>
        <span>118349</span>
      </div>
      <div className="order-row">
        <span>Data de criação</span>
        <span>04/01/2022 - 14:51:13</span>
      </div>
      <div className="order-row">
        <span>Valor do Benefício</span>
        <span>R$ 2.600,00</span>
      </div>
      <div className="order-row">
        <span>Status do Pedido</span>
        <div>
          <Dropdown overlay={option} trigger={['click']} arrow placement="bottomRight">
            <a onClick={e => e.preventDefault()}>
              Concluído <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="order-row">
        <span>Status de Pagamento</span>
        <span>Aguardando</span>
      </div>
      <div className="order-row">
        <button>Detalhe</button>
      </div>

      <style jsx global>
        { global }
      </style>
    </div>
  )
}