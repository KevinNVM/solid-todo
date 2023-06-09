import { createEffect, createSignal } from "solid-js";
import { v4 as uuidV4 } from "uuid";
import "./assets/base.css";
import Layout from "./components/Layout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import AlertSuccess from "./components/AlertSuccess";

function App() {
  const [todos, setTodos] = createSignal([]);
  const [showAlert, setShowAlert] = createSignal(false);

  setTodos(localStorage.todos ? JSON.parse(localStorage.todos) : []);

  console.log(todos());

  const sortedTodos = (todos) => {
    return todos.sort((a, b) => {
      if (a.completedAt !== null && b.completedAt === null) {
        return 1; // 'a' has a non-null completedAt, 'b' has a null completedAt, so 'b' should come first
      } else if (a.completedAt === null && b.completedAt !== null) {
        return -1; // 'a' has a null completedAt, 'b' has a non-null completedAt, so 'a' should come first
      } else if (a.completedAt !== null && b.completedAt !== null) {
        return b.completedAt - a.completedAt; // Both 'a' and 'b' have non-null completedAt, sort by the completedAt date in reverse order
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt); // Both 'a' and 'b' have null completedAt, sort by the createdAt date in reverse order
      }
    });
  };

  const handleFormSubmit = (data, setTodoInput) => {
    if (!data) return false;

    const newTodo = {
      id: uuidV4(),
      text: data,
      createdAt: new Date(),
      completedAt: null,
    };

    setTodos((prev) => sortedTodos([newTodo, ...prev]));
    localStorage.todos = JSON.stringify(todos());
    setTodoInput("");
    setShowAlert(true);
  };

  const handleCheckboxChange = (data) => {
    const newTodos = todos().map((todo) => {
      if (todo.id === data.id) {
        if (data.state) {
          todo.completedAt = new Date();
        } else todo.completedAt = null;
      }

      return todo;
    });

    console.log(data.state);

    // setTodos((prev) => [...newTodos]);
    setTodos((prev) => sortedTodos(newTodos));
    localStorage.todos = JSON.stringify(todos());
  };

  return (
    <>
      <div class="max-w-xl mx-auto border-x border-gray-500 min-h-screen">
        <Layout>
          <main class="p-6">
            <TodoForm onSubmit={handleFormSubmit} />
            <div className="divider"></div>
            <TodoList todos={todos()} onCheckboxChange={handleCheckboxChange} />
          </main>
          <div class="fixed bottom-0 p-4">
            {/* <AlertSuccess hidden={showAlert()} /> */}
          </div>
        </Layout>
      </div>
    </>
  );
}

export default App;
