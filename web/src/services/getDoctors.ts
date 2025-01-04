import { api } from "../lib/api";

export async function getDoctors(name: string) {
  const response = await api.get("/doctors?name=" + name);
  return response.data;
}