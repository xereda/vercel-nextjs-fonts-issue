import ToastContainer, { toast } from '@/components/Toast/ToastContainer';
import { useState } from 'react';

export default function Teste() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Teste Toast:</h1>
      <button
        onClick={() => {
          toast({
            message: 'ah para neh sula ' + (count + 1),
          });
          setCount(count + 1);
        }}
      >
        emitir toast...
      </button>
      <button onClick={() => setCount(0)}>reset state {count}</button>
      <ToastContainer />
    </div>
  );
}
