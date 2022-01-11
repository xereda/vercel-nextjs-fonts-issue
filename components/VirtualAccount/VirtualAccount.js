import Link from 'next/link';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import global from './VirtualAccount.style.js'

export default function VirtualAccount() {
  
  return(
    <div className="balance-wrapper">
      <div className="row-title">
        <span className="title">Saldo da Conta Virtual</span>
        <Tooltip
          placement="rightBottom"
          title="Os seus créditos serão usados automaticamente nos próximos pedidos."
          color="#FFF"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
      <span id="total-value">R$ 1.000,00</span>
    
      <section className="extract">
        <span id="extract-message">
          Este valor representa o saldo total de todas as suas empresas juntas.
          Mas cada uma poderá usar o valor que ela mesma gerou de crédito.
        </span>

        <Link href="/">
          <a id="extract-redirect">Ir para extrato</a>
        </Link>
      </section>
      
      <style jsx global>
        {global}
      </style>
    </div>
  )
}