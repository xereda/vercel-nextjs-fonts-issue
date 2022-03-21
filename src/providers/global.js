import propTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import Portal from '@/components/Portal/Portal';
import Loading from '@/components/Loading/Loading';

GlobalProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = {
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
      {state.loading && (
        <Portal selector="#myportal">
          <Loading />
        </Portal>
      )}
    </DispatchContext.Provider>
  );
}

export const useGlobalStore = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);

export const globalStore = { useGlobalStore, useGlobalDispatch };
