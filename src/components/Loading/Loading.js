import { useState } from '@hookstate/core';
import { loadingStore } from '@/store/index';
import style from './Loading.style';

export default function Loading() {
  const loading = useState(loadingStore);

  return loading?.value ? (
    <>
      <div role="Loading" className="wrapper-loading">
        L O A D I N G . . .
      </div>
      <style jsx="true">{style}</style>
    </>
  ) : null;
}
