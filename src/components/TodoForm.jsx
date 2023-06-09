import { createSignal } from "solid-js";

export default function TodoForm(props) {
  const [todoText, setTodoText] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(todoText(), setTodoText);
  };

  return (
    <form class="flex justify-between gap-2" onSubmit={handleSubmit}>
      <input
        on
        type="text"
        placeholder="Create New Todo"
        class="input input-bordered input-primary w-full"
        value={todoText()}
        onInput={(e) => setTodoText(e.target.value)}
      />
      <button className="btn btn-primary">Save</button>
    </form>
  );
}
