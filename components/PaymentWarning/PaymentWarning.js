import { WarningOutlined, CloseOutlined } from '@ant-design/icons'

import global from './PaymentWarning.style.js'
import Button from '../Button.js';

export default function PaymentWarning() {

  const isBoleto = true // para testes com conteúdo TED

  return (
    <div className="warning">
      {isBoleto && (
        <div className="close-warning">
          <CloseOutlined style={{color: "#009cff"}} />
        </div>
      )}
      
      <div className="icon-warning">
        <WarningOutlined style={{color: "#fff", fontSize: "36px"}} />
      </div>

      <div className="content">
        <span>{isBoleto
          ? "O(s) boleto(s) estão disponíveis no menu financeiro, clique no botão ao lado para visualizá-los."
          : "Realize o pagamento do pedido 1234 para Ben Benefícios e Serviços S/A, CNPJ 30.798.783/0001-61, Banco Santander, agência 2271, conta corrente 130108654 e envie o comprovante junto ao CNPJ e o número do pedido para o e-mail contasareceber@benvisavale.com.br com o título de email: Comprovante TED nº XXXX."
        }</span>
      </div>

      {isBoleto && (
        <div>
          <Button>Ver boletos</Button>
        </div>
      )}

      <style jsx global>
        { global }
      </style>
    </div>
  )
}