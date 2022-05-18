import { createState, useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

const sessionStore = createState({
  usuario: {},
  gruposEmpresa: [],
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: false,
});

const loadingStore = createState(false);

export const sessionState = () => sessionStore;

export const useSessionState = () => {
  const session = useState(sessionStore);
  const sessionNativeObject = session.keys.reduce((acc, cur) => {
    acc[cur] = JSON.parse(JSON.stringify(session.nested(cur).value));

    return acc;
  }, {});

  return [sessionNativeObject, session.set, session.merge];
};

export const loadingState = () => loadingStore;

export const useLoadingState = () => {
  const loading = useState(loadingStore);

  return [loading.value, loading.set];
};

if (typeof window !== 'undefined') {
  sessionState().attach(Persistence('session'));
}
