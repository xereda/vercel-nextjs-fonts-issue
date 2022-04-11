import { useState } from '@hookstate/core';
import { useRouter } from 'next/router';
import { postStatusTerm } from './services.js';
import { loadingStore } from '@/store/index';
import { getErrorMessage } from '@/utils/services';
import ReactTooltip from 'react-tooltip';
import LayoutLogin from '@/components/LayoutLogin/LayoutLogin';
import TermoContent from './TermoContent.js';
import style from './TermoPrivacidade.style';

export default function TermPrivacy() {
  const router = useRouter();
  const enableButton = useState(false);
  const error = useState('');
  const loading = useState(loadingStore);

  const handleScroll = (e) => {
    const isBottom =
      Math.floor(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;

    enableButton?.set(isBottom);
  };

  const handleSubmit = async () => {
    postStatusTerm({
      onStart: () => {
        loading?.set(true);
        error?.set('');
      },
      onSuccess: () => {
        router.push('/atualizar-usuario');
      },
      onError: (e) => {
        error?.set(getErrorMessage(e).message);
        loading?.set(false);
      },
      onFinally: () => loading?.set(false),
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

      <div
        className="term-content" role="term" onScroll={handleScroll}>
        <TermoContent />
      </div>

      <div className="term-footer">
        <button className="cancel" onClick={() => router.push('/login')}>
          Cancelar
        </button>

        <div data-tip data-for="read-terms">
          <button
            disabled={!enableButton.value}
            className="accept-term"
            onClick={handleSubmit}
          >
            Li e aceito o termo
          </button>
        </div>

        {!enableButton.value && (
          <ReactTooltip id="read-terms" place="top" effect="solid">
            Você precisa ler o termo antes de continuar.
          </ReactTooltip>
        )}
      </div>

      <p className="error">{error?.value}</p>

      <style jsx="true">{style}</style>
    </LayoutLogin>
  );
}
