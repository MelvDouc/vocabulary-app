import languageObs from "$client/utils/language-obs";

export default function NotFoundPage({ message = "Page not found" }: {
  message?: string;
}) {
  languageObs.value = null;

  return (
    <p>{message}</p>
  );
}