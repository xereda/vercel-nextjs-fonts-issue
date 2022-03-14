import propTypes from 'prop-types';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useLocalStorage } from '@/utils/hooks';

SessionProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = { session: { accessToken: '', user: {} } };

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case 'SET_DATA_SESSION':
      return { ...state, session: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export function SessionProvider({ children }) {
  const [persistedState, setStateToLocalStorage] = useLocalStorage(
    'session',
    initialState,
  );

  const [state, dispatch] = useReducer(reducer, persistedState);

  useEffect(() => {
    setStateToLocalStorage(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useSessionStore = () => useContext(StateContext);
export const useSessionDispatch = () => useContext(DispatchContext);

export const sessionStore = { useSessionStore, useSessionDispatch };
