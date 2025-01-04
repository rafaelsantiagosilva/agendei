import { api } from "../lib/api";

export async function getDoctorServices(doctorId: number) {
  const response = await api.get(`/doctors/${doctorId}/services`);
  return response.data;
}