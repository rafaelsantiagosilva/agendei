import { api } from "../lib/api";

export async function getAppointments() {
  const response = await api.get("/admins/appointments");
  return response.data;
}