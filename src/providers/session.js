import propTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { useLocalStorage } from '@/utils/hooks';

SessionProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = { session: { accessToken: '', user: {} } };

const reducer = ({ setStateToLocalStorage }) => {
  return (state, action) => {
    switch (action.type) {
      case 'RESET_STATE': {
        setStateToLocalStorage(initialState);

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

  const [state, dispatch] = useReducer(
    reducer({ setStateToLocalStorage }),
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
