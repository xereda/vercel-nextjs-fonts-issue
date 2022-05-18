import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

export const sessionStore = createState({
  usuario: {},
  gruposEmpresa: [],
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: {},
});

export const persistSession = (session) => {
  if (typeof window !== 'undefined') {
    session.attach(Persistence('session'));
  }
};

export const loadingStore = createState(false);