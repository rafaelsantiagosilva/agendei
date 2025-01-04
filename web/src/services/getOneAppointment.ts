import { api } from "../lib/api";

export async function getOneAppointment(appointmentId: number) {
  const response = await api.get(`/appointments/${appointmentId}`);
  return response.data;
}