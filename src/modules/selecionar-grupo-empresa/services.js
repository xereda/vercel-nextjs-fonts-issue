import { httpClient } from '@/utils/services';

export const selectGroup = async ({
  grupoEmpresa,
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  await httpClient({
    method: 'post',
    url: '/api/parametros',
    data: {
      grupoEmpresa,
      shouldSelectGroup: true,
    },
  })
    .then(async (response) => {
      onSuccess(response?.data || {});
    })
    .catch(onError)
    .finally(onFinally);
};