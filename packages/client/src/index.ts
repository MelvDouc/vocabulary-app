import App from "$client/App.js";
import "$client/index.scss";

(async () => {
  document.body.append(await App());
})();