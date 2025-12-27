import cssClasses from "./ToggleSwitch.module.scss";

export default function ToggleSwitch({ id, value, updateValue, title }: {
  id: string;
  value: boolean;
  updateValue: (value: boolean) => void;
  title?: string;
}) {
  let checkbox: HTMLInputElement;

  const $initTrack = (element: HTMLElement) => {
    const animationDurationMs = 300;
    element.style.setProperty("--animation-duration", `${animationDurationMs}ms`);
    element.addEventListener("click", debounce(() => {
      updateValue(checkbox.checked);
    }, animationDurationMs));
  };

  return (
    <label htmlFor={id} className={cssClasses.ToggleSwitch} title={title ?? ""}>
      <input
        type="checkbox"
        id={id}
        checked={value}
        $init={(element) => { checkbox = element; }}
      />
      <div className={cssClasses.Track} $init={$initTrack}></div>
    </label>
  );
}

export function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number) {
  let handler = -1;

  return (...args: T): void => {
    clearTimeout(handler);
    handler = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}