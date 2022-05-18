import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { useLoadingState, useSessionState } from '@/store/index';

export default function Teste() {
  const [loading, setLoading] = useLoadingState();
  const [session, , mergeSession] = useSessionState();

  const orders = session?.orders || [];

  const addOrderToSessionState = () => {
    const newOrder = { id: orders.length + 1, date: new Date().getTime() };
    const ordersToAdd = [...orders, newOrder];

    console.log('addOrderToSessionState', { orders, newOrder, ordersToAdd });

    mergeSession({ orders: ordersToAdd });
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
      <button onClick={() => setLoading(true)}>ligar loading</button>
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
