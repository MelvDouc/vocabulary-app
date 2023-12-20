import "$styles/style.scss";
import "reactfree-jsx";
import DeleteWordButton from "$client/components/DeleteWordButton.js";
import LogInForm from "$client/components/LogInForm.jsx";
import LogOutButton from "$client/components/LogOutButton.js";
import YamlTextArea from "$client/components/YamlTextArea.js";
import WordForm from "$client/components/WordForm.js";

customElements.define("yaml-textarea", YamlTextArea, { extends: "textarea" });
customElements.define("word-form", WordForm, { extends: "form" });
customElements.define("delete-word-btn", DeleteWordButton, { extends: "button" });
customElements.define("log-in-form", LogInForm, { extends: "form" });
customElements.define("log-out-btn", LogOutButton, { extends: "button" });