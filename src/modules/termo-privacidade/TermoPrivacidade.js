import { useState } from 'react';
import { useRouter } from 'next/router';
import { postStatusTerm } from './services.js';
import { getErrorMessage } from '@/utils/services';
import ReactTooltip from 'react-tooltip';
import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import TermoContent from './TermoContent.js';
import style from './TermoPrivacidade.style';
import { useLoadingState } from '@/store/index.js';
import ClientOnly from '@/components/ClientOnly/ClientOnly.js';

export default function TermPrivacy() {
  const router = useRouter();
  const [enabledButton, setButtonIsEnabled] = useState(false);
  const [error, setError] = useState('');
  const [, setLoading] = useLoadingState();

  const handleScroll = (e) => {
    const isBottom =
      Math.floor(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;

    setButtonIsEnabled(isBottom);
  };

  const handleSubmit = async () => {
    postStatusTerm({
      onStart: () => {
        setLoading(true);
        setError('');
      },
      onSuccess: () => {
        router.push('/atualizar-usuario');
      },
      onError: (e) => {
        setError(getErrorMessage(e).message);
        setLoading(false);
      },
      onFinally: () => setLoading(false),
    });
  };

  return (
    <LayoutLogin>
      <header className="header">
        <h1 className="title">
          olá! atualizamos nossa política de privacidade
        </h1>
        <p className="label">
          Leia o termo abaixo para aceitar e continuar com seu portal RH
        </p>
      </header>

      <div className="term-content" role="term" onScroll={handleScroll}>
        <TermoContent />
      </div>

      <div className="term-footer">
        <button className="cancel" onClick={() => router.push('/login')}>
          Cancelar
        </button>

        <div data-tip data-for="read-terms">
          <button
            disabled={!enabledButton}
            className="accept-term"
            onClick={handleSubmit}
          >
            Li e aceito o termo
          </button>
        </div>

        {!enabledButton && (
          <ClientOnly>
            <ReactTooltip id="read-terms" place="top" effect="solid">
              Você precisa ler o termo antes de continuar.
            </ReactTooltip>
          </ClientOnly>
        )}
      </div>

      <p className="error">{error}</p>

      <style jsx="true">{style}</style>
    </LayoutLogin>
  );
}
