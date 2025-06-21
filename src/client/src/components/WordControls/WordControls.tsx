import { navigateToRoute } from "client-side-router";

import Button from "$client/components/Button/Button.js";
import { deleteWord } from "$client/utils/api.js";
import routes from "$client/utils/routes.js";

import cssClasses from "./WordControls.module.scss";

export default function WordControls({ id, language }: {
  id: string;
  language: string;
}) {
  const handleDeletion = async () => {
    if (!confirm("Are you sure you want to delete this word?"))
      return;

    const [success, errors] = await deleteWord(id);

    if (!success) {
      alert(errors.join("\n"));
      return;
    }

    navigateToRoute("app_language", { language });
  };

  return (
    <div className={cssClasses.WordControls}>
      <Button><a href={routes.updateWord(id)}>Update</a></Button>
      <Button isDanger onclick={handleDeletion} title="Delete word">Delete</Button>
    </div>
  );
}