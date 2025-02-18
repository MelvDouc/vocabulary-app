// import MainLayout from "$/views/__layouts/MainLayout.tsx";
// import WordForm from "$/components/WordForm";

// export default function AddOrUpdateWordPage({ formAction, title, wordYaml, backUrl, errors }: {
//   formAction: string;
//   title: string;
//   wordYaml: string;
//   backUrl?: string;
//   errors?: string[];
// }) {
//   return (
//     <MainLayout title={title}>
//       <h1>{title}</h1>
//       <WordForm action={formAction} wordYaml={wordYaml} backUrl={backUrl} />
//       <ErrorList errors={errors} />
//     </MainLayout>
//   );
// }

// function ErrorList({ errors }: {
//   errors?: string[];
// }) {
//   if (!errors)
//     return null;

//   return (
//     <ul class="errors">
//       {errors.map((error) => (
//         <li>{error}</li>
//       ))}
//     </ul>
//   );
// }