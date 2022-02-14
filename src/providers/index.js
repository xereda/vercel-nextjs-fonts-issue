import propTypes from 'prop-types';
import { useContext, createContext, useReducer } from 'react';

Providers.propTypes = {
  children: propTypes.node.isRequired,
};

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = {
  session: { userId: '1111', name: 'Laiz Front-end' },
};

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

export function Providers({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useStore = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);

export const store = { useStore, useDispatch };