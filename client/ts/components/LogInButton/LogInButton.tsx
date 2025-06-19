import Button from "$client/components/Button/Button";
import LogInDialog from "$client/components/LogInButton/LogInDialog";
import { TypedEventEmitter } from "reactfree-jsx/extra";

export default function LogInButton() {
  const eventEmitter = new TypedEventEmitter<{
    showDialog: [];
  }>();

  const [onShowDialog, showDialog] = eventEmitter.createHandlers("showDialog");

  return (
    <>
      <Button onclick={() => showDialog()}>Log in</Button>
      <LogInDialog onShowDialog={onShowDialog} />
    </>
  );
}