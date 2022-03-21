import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);

    return () => setMounted(false);
  }, [selector]);

  return mounted
    ? createPortal(children, document.querySelector(selector))
    : null;
};

export default Portal;
