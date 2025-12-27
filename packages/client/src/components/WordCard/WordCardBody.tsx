import routes from "$client/utils/routes.js";
import { Link } from "reactfree-jsx/extra/router";

export default function WordCardBody({ value }: {
  value: unknown;
}) {
  if (Array.isArray(value))
    return (
      <ol>
        {value.map((item) => (
          <li><WordCardBody value={item} /></li>
        ))}
      </ol>
    );

  if (typeof value !== "object" || value === null)
    return document.createTextNode(String(value));

  if ("_id" in value && "_entry" in value)
    return (
      <Link href={routes.Word(value["_id"] as string)}>{value["_entry"] as string}</Link>
    );

  return (
    <dl>
      {Object.entries(value).map(([key, value]) => (
        <>
          <dt>{key}</dt>
          <dd><WordCardBody value={value} /></dd>
        </>
      ))}
    </dl>
  );
}