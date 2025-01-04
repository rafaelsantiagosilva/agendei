import { api } from "../lib/api";

export async function getServices() {
  const response = await api.get("/services");
  return response.data;
}