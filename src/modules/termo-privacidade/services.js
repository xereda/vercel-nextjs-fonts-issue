import { httpClient } from '@/utils/services';

export const postStatusTerm = async ({
  onStart,
  onSuccess,
  onError,
  onFinally,
}) => {
  onStart?.();

  httpClient({
    method: 'post',
    url: '/api/aceite-termos',
    data: { shouldPersist: true },
  })
    .then(async (response) => {
      onSuccess({ response });
    })
    .catch(onError)
    .finally(onFinally);
};
