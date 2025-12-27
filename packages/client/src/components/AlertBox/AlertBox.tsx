import Button from "$client/components/Button/Button.js";
import cssClasses from "./AlertBox.module.scss";

function AlertBox({ message, type, handleClose }: AlertBoxProps) {
  const quit = () => {
    dialog.close();
    dialog.remove();
    handleClose?.();
  };

  let dialog: HTMLDialogElement;

  return dialog = (
    <dialog className={cssClasses.AlertBox}>
      <p>{message}</p>
      <Button on:click={quit} autofocus colorType={type}>OK</Button>
    </dialog>
  ) as HTMLDialogElement;
}

export function showAlertBox(props: AlertBoxProps) {
  const alertBox = AlertBox(props);
  document.body.prepend(alertBox);
  alertBox.showModal();
}

type ButtonColor = "primary" | "danger";

type AlertBoxProps = {
  message: string | Node;
  type: ButtonColor;
  handleClose?: () => unknown;
};