import { obs, type Obs } from "reactfree-jsx";

export default function ErrorList({ obs }: {
  obs: Obs<string[]>;
}) {
  return (
    <div>
      {obs.map((errors) => (
        errors && (
          <ul>
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        )
      ))}
    </div>
  );
}

export function createErrorObs() {
  return obs<string[]>();
}