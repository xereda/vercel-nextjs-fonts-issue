import { toast, toastState, useToastState } from './useToast';
import style from './Toast.style';

export default function ToastContainer() {
  const [toast] = useToastState();

  return (
    <div className="toast-container">
      {toast?.visible ? (
        <div className="toast-message">{toast?.message}</div>
      ) : null}
      <style jsx="true">{style}</style>
    </div>
  );
}

export { toastState, useToastState, toast };
