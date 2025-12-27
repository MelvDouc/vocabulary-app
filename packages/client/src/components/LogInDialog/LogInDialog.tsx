import { showAlertBox } from "$client/components/AlertBox/AlertBox.js";
import Button from "$client/components/Button/Button.js";
import { logIn } from "$client/utils/api.js";

import cssClasses from "./LogInDialog.module.scss";

export default function LogInDialog({ onShowDialog }: {
  onShowDialog: (listener: VoidFunction) => void;
}) {
  const $init = (element: HTMLDialogElement): void => {
    dialog = element;
    onShowDialog(() => dialog.showModal());
  };

  let dialog: HTMLDialogElement;

  return (
    <dialog className={cssClasses.LogInDialog} $init={$init}>
      <form on:submit={handleSubmit} method="dialog">
        <section>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </section>
        <section className={cssClasses.SubmitSection}>
          <Button type="submit" pill>Log in</Button>
          <Button type="button" colorType="danger" on:click={() => dialog.close()} pill>Cancel</Button>
        </section>
      </form>
    </dialog>
  );
}

async function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const [_, error] = await logIn(email, password);

  if (error) {
    showAlertBox({ message: error, type: "danger" });
    return;
  }

  location.reload();
}