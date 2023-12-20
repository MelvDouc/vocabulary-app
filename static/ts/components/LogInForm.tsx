export default class LogInForm extends HTMLFormElement {
  constructor() {
    super();
    let email = "";
    let password = "";
    this.append(
      <>
        <article className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            oninput={({ target }) => email = (target as HTMLInputElement).value}
            required
          />
        </article>
        <article className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            oninput={({ target }) => password = (target as HTMLInputElement).value}
            required
          />
        </article>
        <article className="form-submit">
          <button className="btn" type="submit">Log In</button>
        </article>
      </>
    );
    this.addEventListener("submit", async (e) => {
      e.preventDefault();
      const response = await fetch(location.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        location.href = "/";
        return;
      }
      alert(data.errors.join("\n"));
    });
  }
}