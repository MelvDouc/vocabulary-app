import { showAlertBox } from "$client/components/AlertBox/AlertBox.js";
import Button from "$client/components/Button/Button.js";
import { deleteWord } from "$client/utils/api.js";
import routes from "$client/utils/routes.js";
import { Link, navigate } from "reactfree-jsx/extra/router";

import cssClasses from "./WordControls.module.scss";

export default function WordControls({ id, backPath }: {
  id: string;
  backPath: string;
}) {
  return (
    <div className={cssClasses.WordControls}>
      <Button pill><Link href={routes.UpdateWord(id)}>Update</Link></Button>
      <Button
        colorType="danger"
        title="Delete word"
        on:click={() => handleDeletion(id, backPath)}
        pill
      >Delete</Button>
    </div>
  );
}

async function handleDeletion(id: string, backPath: string) {
  if (!confirm("Are you sure you want to delete this word?"))
    return;

  const [_, error] = await deleteWord(id);

  if (error) {
    showAlertBox({ message: error, type: "danger" });
    return;
  }

  navigate(backPath);
}