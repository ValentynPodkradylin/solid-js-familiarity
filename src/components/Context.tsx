import type { Accessor, Component, ParentProps } from "solid-js";
import { createSignal, createContext, useContext } from "solid-js";

const CounterContext =
  createContext<
    (Accessor<number> | { increment: () => void; decrement: () => void })[]
  >();

interface CounterProviderProps extends ParentProps {
  count?: number;
}

export const CounterProvider: Component<CounterProviderProps> = (props) => {
  const { count: countProps, children } = props;
  const [count, setCount] = createSignal<number>(countProps || 0),
    store = [
      count,
      {
        increment() {
          setCount((c) => c + 1);
        },
        decrement() {
          setCount((c) => c - 1);
        },
      },
    ];

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

export function useCounter() {
  return useContext<
    | (Accessor<number> | { increment: () => void; decrement: () => void })[]
    | undefined
  >(CounterContext);
}

const Context: Component = () => {
  const [count, { increment, decrement } = useCounter();
  return (
    <CounterProvider count={1}>
      <div>{count()}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </CounterProvider>
  );
};

export default Context;
