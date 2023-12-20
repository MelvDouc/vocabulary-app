import express from "express";
import router from "$server/core/router.js";
import cookieParser from "cookie-parser";

const app = express();
const port = Number(process.env.PORT ?? process.env.port ?? 10_000);

app.use(express.static("static"));
app.set("views", "client");
app.set("view engine", "twig");
app.set("twig options", {
  strict_variables: false,
  allowAsync: true
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  if (process.env.NODE_ENV === "development")
    console.log(`App running on http://localhost:${port} ...`);
});