import { api } from "../lib/api";

export async function getCustomers() {
  const response = await api.get("/users");
  return response.data;
}