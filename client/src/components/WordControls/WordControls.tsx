import Button from "$client/components/Button/Button.js";
import { deleteWord } from "$client/utils/api.js";
import routes from "$client/utils/routes.js";
import { Link, navigate } from "reactfree-jsx/extra/router";

import cssClasses from "./WordControls.module.scss";

export default function WordControls({ id, backPath }: {
  id: string;
  backPath: string;
}) {
  const handleDeletion = async () => {
    if (!confirm("Are you sure you want to delete this word?"))
      return;

    const [_, error] = await deleteWord(id);

    if (error) {
      // TODO: alert box
      alert(error);
      return;
    }

    navigate(backPath);
  };

  return (
    <div className={cssClasses.WordControls}>
      <Button><Link href={routes.UpdateWord(id)}>Update</Link></Button>
      <Button isDanger on:click={handleDeletion} title="Delete word">Delete</Button>
    </div>
  );
}