import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Todo from "./Todo";

export default function TodoList(props) {
  dayjs.extend(relativeTime);

  const displayDate = ($date) => dayjs(new Date($date)).fromNow();

  const handleOnChange = (data) => {
    props.onCheckboxChange(data);
  };

  return (
    <ul class="flex flex-col gap-2">
      {props.todos?.length > 0 ? (
        props.todos.map((todo) => {
          return (
            <Todo
              displayDate={displayDate}
              todo={todo}
              onChange={handleOnChange}
            />
          );
        })
      ) : (
        <h1
          class="text-lg font-semibold capitalize leading-ti
        "
        >
          There's currently no todo yet...
        </h1>
      )}
    </ul>
  );
}
