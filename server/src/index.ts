import { Application } from "$server/deps.js";
import ApiController from "$server/controllers/ApiController.js";
import MiddlewareController from "$server/controllers/MiddlewareController.js";
import ViewsController from "$server/controllers/ViewsController.js";

const port = Number(process.env.PORT) || 8000;
const app = new Application({ debug: true });

app.setControllers([
  MiddlewareController,
  ApiController,
  ViewsController,
]);

app.listen(port, () => {
  console.log(`App running on http://melvin-doucet.local:${port}...`);
});