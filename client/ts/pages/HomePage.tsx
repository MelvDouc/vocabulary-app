import routes from "$global/routes";
import { getLanguages } from "$client/utils/api";

export default async function HomePage() {
  const languages = await getLanguages();

  return (
    <>
      <h1>Home</h1>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li>
            <a href={routes.language(lang)}>{lang}</a>
          </li>
        ))}
      </ul>
    </>
  );
}