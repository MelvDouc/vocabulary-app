import type { Obs } from "reactfree-jsx";

import cssClasses from "./Spinner.module.scss";

export default function Spinner({ openObs }: {
  openObs: Obs<boolean>;
}) {
  return (
    <dialog className={cssClasses.Spinner} open={openObs}>
      <img src="/favicon.png" alt="" className={cssClasses.SpinnerImage} />
    </dialog>
  );
}