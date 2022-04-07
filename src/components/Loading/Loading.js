import Image from 'next/image';
import { useState } from '@hookstate/core';
import { loadingStore } from '@/store/index';
import style from './Loading.style';

export default function Loading() {
  const loading = useState(loadingStore);

  return loading?.value ? (
    <>
      <div role="Loading" className="wrapper-loading">
        <Image
          width={72}
          height={72}
          src="/gif/logo-animado-ben-transparente.gif"
          alt="Logo da Ben - loading"
        />
      </div>
      <style jsx="true">{style}</style>
    </>
  ) : null;
}
