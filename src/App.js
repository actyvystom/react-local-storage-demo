import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import List from "./components/List";
import Form from "./components/Form";
import "./styles.css";

export default function App() {
  // declare a state variable using the useLocalStorageState hook (installed as 3rd party dependency via 'npm install use-local-storage-state' )
  const [todos, setTodos] = useLocalStorageState("todos", {
    defaultValue: [],
  });
  // declare a handler function to pass as prop to our form component
  function handleAddTodo(title) {
    // use the state setter as usual (treat state as immutable, so we create a copy of the existing values) to add our new todo
    setTodos([
      {
        id: uid(),
        title,
        isChecked: false,
      },
      ...todos,
    ]);
  }
  // declare a handler function we pass as prop to our List component
  function handleToggleCheckTodo(idToToggle) {
    // use the setter function to update our todo object in state (and local storage, thanks to useLocalStorage hook)
    setTodos(
      todos.map((todo) =>
        todo.id === idToToggle ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  }

  return (
    <main>
      <h1>Todo-App</h1>
      <Form onAddTodo={handleAddTodo} />
      <List todos={todos} onToggleCheckTodo={handleToggleCheckTodo} />
    </main>
  );
}
