import type { Obs } from "reactfree-jsx";
import cssClasses from "./Spinner.module.scss";

export default function Spinner({ openObs }: {
  openObs: Obs<boolean>;
}) {
  return (
    <dialog className={cssClasses.Spinner} open={openObs}>
      <img className={cssClasses.SpinnerImage} src="/client/favicon.png" alt="Spinner" />
    </dialog>
  );
}