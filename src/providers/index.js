import propTypes from 'prop-types';
import { useContext, createContext, useState } from 'react';

Providers.propTypes = {
  children: propTypes.node.isRequired,
};

const SessionStateContext = createContext();
const SessionDispatchContext = createContext();

const initialSessionState = { session: 'blablabla' };

export function Providers({ children }) {
  const [state, dispatch] = useState(initialSessionState);

  return (
    <SessionDispatchContext.Provider value={dispatch}>
      <SessionStateContext.Provider value={state}>
        {children}
      </SessionStateContext.Provider>
    </SessionDispatchContext.Provider>
  );
};

export const useSession = () => useContext(SessionStateContext);
export const useDispatchSession = () => useContext(SessionDispatchContext);

export const sessionStore = { useSession, useDispatchSession };