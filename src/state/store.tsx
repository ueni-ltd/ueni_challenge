import React, { createContext, useReducer } from 'react';
import reducer, { State } from './reducer';

const defaultState: State = {
  events: [],
  dispatch: () => {},
};

export const Context = createContext(defaultState);

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <Context.Provider value={{ ...state, dispatch: dispatch }}>{children}</Context.Provider>;
};

export default Store;
