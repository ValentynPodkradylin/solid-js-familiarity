import { Component, createSignal } from "solid-js";

export interface MouseEventOnClick extends MouseEvent {
  currentTarget: HTMLButtonElement;
  target: Element;
}

const Events: Component = () => {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  const handler = (data: number, event: MouseEventOnClick) => {
    console.log(`data: ${data}; event: ${event.target}`);
  };

  return (
    <div>
      The mouse position is {pos().x} x {pos().y}
      <button onClick={(e) => [handler, 2]}>click</button>
    </div>
  );
};

export default Events;
