import { WarningOutlined, CloseOutlined } from '@ant-design/icons';
import { sessionStore } from '@/providers/index';
import Button from '@/components/Button/Button.js';
import style from './PaymentWarning.style.js';

export default function PaymentWarning() {
  const dispatch = sessionStore.useDispatchSession();

  const isBoleto = true;
  const idPedido = '9999';

  const noticeTED = `Realize o pagamento do pedido ${idPedido} para Ben Benefícios e
    Serviços S/A, CNPJ 30.798.783/0001-61, Banco Santander,
    agência 2271, conta corrente 130108654 e envie o comprovante junto
    ao CNPJ e o número do pedido para o e-mail
    contasareceber@benvisavale.com.br com o título de email:
    Comprovante TED nº XXXX.`;

  const noticeBoleto = `O(s) boleto(s) estão disponíveis no menu financeiro, 
    clique no botão ao lado para visualizá-los. ${sessionStore.useSession().session}`;

  return (
    <>
      <section className="warning">
        {isBoleto && (
          <div className="close-warning">
            <CloseOutlined style={{color: '#009cff'}} />
          </div>
        )}

        <div className="icon-warning">
          <WarningOutlined style={{color: '#fff', fontSize: '36px'}} />
        </div>

        <div
          className="notice"
          role="notice"
          aria-label={isBoleto ? 'Boleto' : 'TED'}
        >
          {isBoleto ? noticeBoleto : noticeTED}
        </div>

        {isBoleto && (
          <div>
            <Button onClick={() => dispatch({ session: 'C A C A U ! ! ! '})} aria-label="ver-boletos">Ver boletos</Button>
          </div>
        )}
      </section>

      <style jsx="true">{style}</style>
    </>
  );
}