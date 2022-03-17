import propTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { useLocalStorage } from '@/utils/hooks';
import { httpClient } from '@/utils/services';

SessionProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = {
  session: {
    accessToken: '',
    credential: '',
    timestamp: '',
    grupoEmpresa: {},
    user: {},
  },
};

const reducer = ({ setStateToLocalStorage, cleanSessionCookie }) => {
  return (state, action) => {
    switch (action.type) {
      case 'RESET_STATE': {
        setStateToLocalStorage(initialState);

        cleanSessionCookie();

        return initialState;
      }
      case 'SET_DATA_SESSION': {
        const updatedState = { ...state, session: action.payload };
        setStateToLocalStorage(updatedState);

        return updatedState;
      }
      default:
        throw new Error(`Unknown action: ${action.type}`);
    }
  };
};

export function SessionProvider({ children }) {
  const [persistedState, setStateToLocalStorage] = useLocalStorage(
    'session',
    initialState,
  );

  const cleanSessionCookie = async () =>
    await httpClient({ method: 'get', url: '/api/clean-cookie' });

  const [state, dispatch] = useReducer(
    reducer({ setStateToLocalStorage, cleanSessionCookie }),
    persistedState,
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useSessionStore = () => useContext(StateContext);
export const useSessionDispatch = () => useContext(DispatchContext);

export const sessionStore = { useSessionStore, useSessionDispatch };
