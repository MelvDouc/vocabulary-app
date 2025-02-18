const routes = {
  home: () => "/",
  language: (language: string) => `/language/${language}`,
  word: (id: string) => `/word?id=${id}`,
  addWord: () => "/word/add",
  updateWord: (id: string) => `/word/update?id=${id}`,
  deleteWord: (id: string, language: string) => `/word/delete?id=${id}&language=${language}`,
} as const;

export default routes;