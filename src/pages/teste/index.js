import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { useLoadingState, useSessionState } from '@/store/index';
import InputOptions from '@/components/InputOptions/InputOptions';

export default function Teste() {
  const [loading, setLoading] = useLoadingState();
  const [session, , mergeSession] = useSessionState();

  const orders = session?.nested?.('orders')?.value || [];

  const addOrderToSessionState = () => {
    const newOrder = { id: orders.length + 1, date: new Date().getTime() };

    if (!session?.orders?.value) {
      mergeSession({ orders: [] });
    }

    session.orders.merge([newOrder]);
  };

  return (
    <ClientOnly>
      <h1>isLoading? {loading ? 'true' : 'false'}</h1>
      <div>
        <h2>orders:</h2>
        {orders.map((order, index) => (
          <p key={index}>
            {order?.id} - {order?.date}
          </p>
        ))}
      </div>
      <InputOptions
        value="1158"
        placeholder="Buscar por"
        options={[
          { value: 'ID_PEDIDO', label: 'ID do pedido' },
          { value: 'ID_FATURA', label: 'ID da fatura', default: true },
          { value: 'CNPJ', label: 'CNPJ' },
        ]}
        onTypeFilter={console.log}
        onChangeOption={console.log}
      />
      ,<button onClick={() => setLoading(true)}>ligar loading</button>
      <button onClick={() => setLoading(false)}>desligar loading</button>
      <button onClick={addOrderToSessionState}>
        adicionar pedido numa nova propriedade em session
      </button>
      <style jsx="true">{`
        button {
          z-index: 9999;
          position: relative;
          margin: 10px;
        }
      `}</style>
    </ClientOnly>
  );
}
