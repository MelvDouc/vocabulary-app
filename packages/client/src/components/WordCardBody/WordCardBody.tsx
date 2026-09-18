import cssClasses from "./WordCardBody.module.scss";

export default function WordCardBody({ value }: {
  value: unknown;
}) {
  if (Array.isArray(value))
    return (<WordCardBodyList items={value} />);

  if (typeof value === "object" && value !== null)
    return (<WordCardBodyDict dict={value} />);

  return (<span>{String(value)}</span>);
}

function WordCardBodyList({ items }: { items: unknown[]; }) {
  return (
    <ul className={cssClasses.WordCardBodyList}>
      {items.map((item) => (
        <li><WordCardBody value={item} /></li>
      ))}
    </ul>
  );
}

function WordCardBodyDict({ dict }: { dict: object; }) {
  return (
    <ul className={cssClasses.WordCardBodyDict}>
      {Object.entries(dict).map(([key, value]) => (
        <li><strong>{key}</strong> <WordCardBody value={value} /></li>
      ))}
    </ul>
  );
}