// import routes from "$/server/core/routes.ts";
// import type { Word } from "$/server/types.ts";
// import MainLayout from "$/views/__layouts/MainLayout.tsx";
// import WordCard from "$/components/WordCard/WordCard";

// export default function WordPage({ word }: {
//   word: Word;
// }) {
//   const { _id, entry, language, class: wordClass, ...others } = word;
//   const id = _id.toHexString();

//   return (
//     <MainLayout title={entry}>
//       <div class="word-card">
//         <h1>{entry}</h1>
//         <h2><a href={`/language/${language}`}>{language}</a></h2>
//         <h3>{wordClass}</h3>
//         <WordCard value={others} />
//         <div class="controls">
//           <a href={routes.updateWord(id)} class="btn">Update</a>
//           <form
//             method="post"
//             action={routes.deleteWord(id, word.language)}
//             is="confirm-form"
//             data-message="Are you sure you want to delete this word?"
//           >
//             <button type="submit" class="btn btn-danger">Delete</button>
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }