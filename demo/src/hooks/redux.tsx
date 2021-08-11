import * as React from "react";
import {
  FC,
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useReducer,
} from "react";
import { init, reducer, add } from "./common";
const Context = createContext({});

const Child: FC<any> = () => {
  const context: any = useContext(Context);
  return (
    <div>
      <h1>Now: {context.state.count}</h1>
      <button onClick={() => context.dispatch(add(2))}>add 2</button>
    </div>
  );
};

const ReduxTest: FC<any> = () => {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <div>
      <h1>Now Father: {state.count}</h1>
      <button onClick={() => dispatch(add(3))}>add 3</button>
      <Context.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Child />
      </Context.Provider>
    </div>
  );
};

export default ReduxTest;
