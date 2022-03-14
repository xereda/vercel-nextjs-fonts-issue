import propTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import Portal from '@/components/Portal/Portal';
import Loading from '@/components/Loading/Loading';

Providers.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = {
  session: { accessToken: '', user: {} },
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case 'SET_DATA_SESSION':
      return { ...state, session: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export function Providers({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
      {state.loading && (
        <Portal>
          <Loading />
        </Portal>
      )}
    </DispatchContext.Provider>
  );
}

export const useStore = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);

export const store = { useStore, useDispatch };
