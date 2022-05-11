import { createState } from '@hookstate/core';

export const sessionStore = createState({
  usuario: {},
  gruposEmpresa: {},
  grupoEmpresa: {},
  parametros: {},
  usuarioAceitouTermos: {},
});

export const loadingStore = createState(false);
