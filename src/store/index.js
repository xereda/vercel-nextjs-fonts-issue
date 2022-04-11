import { createState } from '@hookstate/core';

export const sessionStore = createState({
  usuario: {},
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: {},
});

export const loadingStore = createState(false);
