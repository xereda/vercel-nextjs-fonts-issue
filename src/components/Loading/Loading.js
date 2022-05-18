import Image from 'next/image';
import { useLoadingState } from '@/store/index';
import style from './Loading.style';

export default function Loading() {
  const [loading] = useLoadingState();

  return loading ? (
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
