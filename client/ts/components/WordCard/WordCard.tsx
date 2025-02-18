export default function WordCard({ value }: {
  value: JsonValue;
}) {
  if (Array.isArray(value))
    return (
      <ol>
        {value.map((item) => (
          <li><WordCard value={item} /></li>
        ))}
      </ol>
    );

  if (typeof value === "object" && value !== null)
    return (
      <dl>
        {Object.entries(value).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd><WordCard value={value} /></dd>
          </>
        ))}
      </dl>
    );

  return <>{String(value)}</>;
}