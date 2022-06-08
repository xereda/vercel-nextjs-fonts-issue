import { createState, useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

const sessionStore = createState({
  usuario: {},
  gruposEmpresa: [],
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: false,
});

const sessionState = () => sessionStore;

const useSessionState = () => {
  const session = useState(sessionStore);

  return [session, session.set, session.merge];
};

if (typeof window !== 'undefined') {
  sessionState().attach(Persistence('session'));
}

const loadingStore = createState(false);

const loadingState = () => loadingStore;

const useLoadingState = () => {
  const loading = useState(loadingStore);

  return [loading.value, loading.set];
};

export { sessionState, useSessionState, loadingState, useLoadingState };
