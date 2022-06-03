import { createState, useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

const sessionStore = createState({
  usuario: {},
  gruposEmpresa: [],
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: false,
});

export const sessionState = () => sessionStore;

export const useSessionState = () => {
  const session = useState(sessionStore);

  return [session, session.set, session.merge];
};

if (typeof window !== 'undefined') {
  sessionState().attach(Persistence('session'));
}

const loadingStore = createState(false);

export const loadingState = () => loadingStore;

export const useLoadingState = () => {
  const loading = useState(loadingStore);

  return [loading.value, loading.set];
};
