const routes = {
  home: () => "/",
  language: (language: string) => `/languages/${language}`,
  word: (id: string) => `/word/@/${id}`,
  addWord: () => "/word/add",
  updateWord: (id: string) => `/word/update/${id}`
} as const;

export default routes;