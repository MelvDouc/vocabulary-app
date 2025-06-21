import Button from "$client/components/Button/Button.js";
import ErrorList, { createErrorObs } from "$client/components/ErrorList/ErrorList.js";
import { logIn } from "$client/utils/api.js";

import cssClasses from "./LogInDialog.module.scss";

export default function LogInDialog({ onShowDialog }: {
  onShowDialog: (listener: VoidFunction) => void;
}) {
  const $init = (element: HTMLDialogElement): void => {
    dialog = element;
    onShowDialog(() => element.showModal());
  };

  const errorObs = createErrorObs();
  let dialog: HTMLDialogElement;

  return (
    <dialog className={cssClasses.LogInDialog} $init={$init}>
      <form onsubmit={createSubmitHandler((errors) => errorObs.value = errors)} method="dialog">
        <section>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </section>
        <section className={cssClasses.SubmitSection}>
          <Button type="submit">Log in</Button>
          <Button type="button" isDanger onclick={() => dialog.close()}>Cancel</Button>
        </section>
        <ErrorList obs={errorObs} />
      </form>
    </dialog>
  );
}

function createSubmitHandler(setErrors: (errors: string[]) => void) {
  return async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const [success, errors] = await logIn(email, password);

    if (!success) {
      setErrors(errors);
      return;
    }

    location.reload();
  };
}