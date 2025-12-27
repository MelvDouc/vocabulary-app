const routes = {
  HOME: "/",
  ADD_WORD: "/words/new",
  UPDATE_WORD: "/words/update",
  WORDS: "/words",
  Word: (id: string) => withQuery(routes.WORDS, { id }),
  UpdateWord: (id: string) => withQuery(routes.UPDATE_WORD, { id }),
  Words: <L extends string>(language: L) => `/words/${language}` as `/words/${L}`,
  WordRange: (language: string, from: string, to: string) => withQuery(routes.Words(language), { from, to })
} as const;

function queryString(params: Record<string, string>): string {
  const output = Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&");
  return `?${output}`;
}

function withQuery<T extends string>(input: T, params: Record<string, string>): `${T}?${string}` {
  return input + queryString(params) as `${T}?${string}`;
}

export default routes;