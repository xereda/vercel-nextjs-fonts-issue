import { toast, toastState, useToastState } from './useToast';
import style from './Toast.style';

export default function ToastContainer() {
  const [toast] = useToastState();

  return toast?.visible ? (
    <>
      <div className="toast-container" role="alert">
        <div className="toast-message">{toast?.message}</div>
      </div>
      <style jsx="true">{style}</style>
    </>
  ) : null;
}

export { toastState, useToastState, toast };
