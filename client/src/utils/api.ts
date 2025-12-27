import type { AsyncResult, JsonValue, User, Word } from "$client/types.js";

const API_URL = import.meta.env.VITE_API_URL;

type Path = `/${string}`;

async function api<Data, Err>(path: Path, requestInit?: RequestInit): AsyncResult<Data, Err> {
  try {
    const response = await fetch(API_URL + path, requestInit);
    const result = await response.json();
    return result as [Data, null];
  } catch (error) {
    return [null, error as Err];
  }
}

const get = <Data, Err>(path: Path) => api<Data, Err>(path, { method: "GET" });

const post = <Data, Err>(path: Path, body: JsonValue) => api<Data, Err>(path, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify(body)
});

const put = <Data, Err>(path: Path, body: JsonValue) => api<Data, Err>(path, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify(body)
});

const del = <Data, Err>(path: Path) => api<Data, Err>(path, {
  method: "DELETE",
  credentials: "include"
});

export const getLanguages = () => get<string[], string>("/words/languages");
export const getWords = (language: string) => get<Word[], string>(`/words?language=${language}`);
export const getWordRange = (language: string, from: string, to: string) => {
  return get<Word[], string>(`/words?language=${language}&from=${from}&to=${to}`);
};
export const getWord = (id: string) => get<Word, string>(`/words/@?id=${id}`);
export const getWordTOML = (id: string) => get<string, string>(`/words/@?id=${id}&as-toml=true`);
export const getRandomWord = (language: string) => get<Word, string>(`/words/random?language=${language}`);
export const addWord = (text: string) => post<Word, string[]>("/words", { text });
export const updateWord = (id: string, text: string) => put<void, string[]>(`/words/@?id=${id}`, { text });
export const deleteWord = (id: string) => del<void, string>(`/words/@?id=${id}`);

export const checkCredentials = () => post<User, string>("/auth/check-credentials", {});
export const logIn = (email: string, password: string) => post<void, string>("/auth/log-in", { email, password });
export const logOut = () => post("/auth/log-out", {});