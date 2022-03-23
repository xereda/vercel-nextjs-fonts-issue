import { createState } from '@hookstate/core';

export const sessionStore = createState({
  session: {
    usuario: {},
    grupoEmpresa: {},
    parametros: {},
  },
});

export const loadingStore = createState(false);
