import { AppointmentRepository } from "@/repositories/appointment.repository";
import { Appointment } from "@prisma/client";

export class AppointmentService {
  public static async getAll(userId: number) {
    const doctors = await AppointmentRepository.getAll(userId);
    return doctors;
  }

  // public static async getServices(id: number) {
  //   const services = await DoctorRepository.getServices(id);
  //   return services;
  // }

  // public static async create({ name, specialty, icon }: Appointment) {
  //   await AppointmentRepository.create({ id: 0, name, specialty, icon });
  // }

  // public static async update(appointment: Appointment) {
  //   await AppointmentRepository.update(appointment);
  // }

  // public static async delete(id: number) {
  //   await AppointmentRepository.delete(id);
  // }
}