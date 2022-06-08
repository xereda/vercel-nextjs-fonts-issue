import { createState, useState } from '@hookstate/core';

const toastStore = createState({ timeout: 5000, visible: false, message: '' });

const toastState = () => toastStore;

const useToastState = () => {
  const toast = useState(toastStore);

  return [toast.value, toast.merge];
};

const toast = (options = {}) => {
  const currentState = toastState();

  if (currentState?.visible?.value) {
    setTimeout(() => toast(options), 1000);

    return;
  }

  currentState.merge({
    message: options?.message || '',
    visible: true,
  });

  setTimeout(
    () => currentState.merge({ message: '', visible: false }),
    options?.timeout || currentState.timeout.value,
  );
};

export { toastState, useToastState, toast };
