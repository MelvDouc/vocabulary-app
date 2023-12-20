export default class LogOutButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to log out?"))
        return;
      const response = await fetch(`/log-out`, {
        method: "POST"
      });
      await response.json();
      location.href = "/log-in";
    });
  }
}