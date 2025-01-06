import { api } from "../lib/api";

export async function getOneDoctor(id: number) {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
}