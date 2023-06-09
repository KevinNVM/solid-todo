export default function Todo(props) {
  const handleOnCheck = (e) => {
    props.onChange({ id: props.todo.id, state: e.target.checked });
  };

  return (
    <li class="flex justify-between p-4 hover:bg-neutral/50 hover:border-primary/50 rounded-lg border-neutral border transition">
      <div class="prose">
        <h3 class={props.todo.completedAt && "line-through"}>
          {props.todo.text}
        </h3>
        <span>{props.displayDate(props.todo.createdAt)}</span>
      </div>
      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        onChange={handleOnCheck}
        checked={!!props.todo.completedAt}
      />
    </li>
  );
}
