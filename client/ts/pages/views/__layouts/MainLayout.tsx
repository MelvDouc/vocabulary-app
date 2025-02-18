import Nav from "$/views/__components/Nav.tsx";

export default function MainLayout({ title, children }: {
  title: string;
  children: unknown;
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A polyglot's personal vocabulary learning app." />
        <meta name="keywords" content="language, vocabulary" />
        <meta name="author" content="Melvin Doucet" />
        <base href="/" />
        <link rel="icon" href="favicon.png" type="image/png" />
        <link rel="stylesheet" href="css/style.css" />
        <script type="module" src="js/main.js"></script>
        <title>{title} | Vocabulary App</title>
      </head>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}