import { Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Store: Component = () => {
  let input: HTMLInputElement;
  let todoId = 0;
  // const [todos, setTodos] = createSignal([]);

  const [store, setStore] = createStore<{ todos: Todo[] }>({ todos: [] });

  const addTodo = (text: string) => {
    setStore("todos", (todos) => [
      ...todos,
      { id: ++todoId, text, completed: false },
    ]);
  };
  const toggleTodo = (id: number) => {
    setStore(
      "todos",
      (t) => t.id === id,
      "completed",
      (completed) => !completed
    );
  };

  return (
    <>
      <div>
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            addTodo(input.value);
            input.value = "";
          }}
        >
          Add Todo
        </button>
      </div>
      <For each={todos()}>
        {(todo) => {
          const { id, text } = todo;
          console.log(`Creating ${text}`);
          return (
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onchange={[toggleTodo, id]}
              />
              <span
                style={{
                  "text-decoration": todo.completed ? "line-through" : "none",
                }}
              >
                {text}
              </span>
            </div>
          );
        }}
      </For>
    </>
  );
};

export default Store;
