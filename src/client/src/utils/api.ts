import axios from "axios";
import type { Result, Word } from "$client/types.js";

const BASE_URL = "/api/v1";

// ===== ===== ===== ===== =====
// VOC
// ===== ===== ===== ===== =====

export async function getLanguages() {
  const response = await axios.get<string[]>(`${BASE_URL}/languages`);
  return response.data;
}

export async function getWords(language: string) {
  const response = await axios.get<Word[]>(`${BASE_URL}/languages/${language}`);
  return response.data;
}

export async function getWord<Y extends boolean>(id: string, asText: Y) {
  const searchParams = new URLSearchParams();
  searchParams.set("id", id);
  asText && searchParams.set("as-text", "1");

  const url = `${BASE_URL}/words?${searchParams}`;
  const response = await axios.get<(Y extends true ? string : Word) | null>(url);
  return response.data;
}

export async function getRandomWordId(language: string) {
  const url = `${BASE_URL}/languages/${language}/random-word-id`;
  const response = await axios.get<string | null>(url);
  return response.data;
}

export async function addWord(text: string) {
  const response = await axios.post(`${BASE_URL}/words/add`, { text });
  return response.data as Result<Word>;
}

export async function updateWord(id: string, text: string) {
  const response = await axios.put(`${BASE_URL}/words/update?id=${id}`, { text });
  return response.data as Result<true>;
}

export async function deleteWord(id: string) {
  const response = await axios.delete(`${BASE_URL}/words/delete?id=${id}`);
  return response.data as Result<true>;
}

// ===== ===== ===== ===== =====
// AUTH
// ===== ===== ===== ===== =====

export async function checkCredentials() {
  const response = await axios.post(`${BASE_URL}/auth/check-credentials`);
  return response.data as { email: string; } | null;
}

export async function logIn(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/auth/log-in`, { email, password });
  return response.data as Result<true>;
}

export function logOut() {
  return axios.post<never>(`${BASE_URL}/auth/log-out`);
}