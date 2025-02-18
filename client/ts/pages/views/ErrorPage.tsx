import MainLayout from "$/views/__layouts/MainLayout.tsx";

export default function ErrorPage({ title = "Page not found", message }: {
  title?: string;
  message?: string;
} = {}) {
  return (
    <MainLayout title={title}>
      {message && (<p>{message}</p>)}
      <a href="/">Home</a>
    </MainLayout>
  );
}