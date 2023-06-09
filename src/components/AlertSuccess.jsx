import { createEffect, createSignal } from "solid-js";

export default function AlertSuccess(props) {
  const [showAlert, setShowalert] = createSignal(false);

  setShowalert(props.hidden);

  createEffect(() => {
    setInterval(() => {
      if (showAlert()) showAlert(false);
    }, 2000);
  });

  return (
    !props.hidden && (
      <div class={`alert alert-success`} onClick={(e) => props.onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Todo Saved</span>
      </div>
    )
  );
}
