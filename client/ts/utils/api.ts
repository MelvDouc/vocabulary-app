import axios from "axios";

const BASE_URL = "/api/v1";

export async function getLanguages() {
  const response = await axios.get<string[]>(BASE_URL + "/languages");
  return response.data;
}