import propTypes from 'prop-types';
import {
  GlobalProvider,
  globalStore,
  useGlobalDispatch,
  useGlobalStore,
} from './global';
import {
  SessionProvider,
  sessionStore,
  useSessionDispatch,
  useSessionStore,
} from './session';

Providers.propTypes = {
  children: propTypes.node.isRequired,
};

export function Providers({ children }) {
  return (
    <GlobalProvider>
      <SessionProvider>{children}</SessionProvider>
    </GlobalProvider>
  );
}

export {
  globalStore,
  useGlobalDispatch,
  useGlobalStore,
  sessionStore,
  useSessionDispatch,
  useSessionStore,
};
