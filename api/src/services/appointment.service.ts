import { AppointmentRepository } from "@/repositories/appointment.repository";
import { Appointment } from "@prisma/client";

export class AppointmentService {
  public static async getAll(userId: number) {
    const appointments = await AppointmentRepository.getAll(userId);
    return appointments;
  }

  public static async getById(id: number) {
    const appointment = await AppointmentRepository.getById(id);
    return appointment;
  }

  public static async create({ user_id, doctor_id, service_id, booking_date, booking_hour }: Appointment) {
    await AppointmentRepository.create({ id: 0, user_id, doctor_id, service_id, booking_date, booking_hour });
  }

  public static async update(appointment: Appointment) {
    await AppointmentRepository.update(appointment);
  }

  public static async delete(id: number) {
    await AppointmentRepository.delete(id);
  }
}