import { DoctorRepository } from "@/repositories/doctor.repository";
import { Doctor } from "@prisma/client";

export class DoctorService {
  public static async getAll(name: string | undefined) {
    const doctors = await DoctorRepository.getAll(name);
    return doctors;
  }

  public static async getServices(id: number) {
    const services = await DoctorRepository.getServices(id);
    return services;
  }

  public static async create({ name, specialty, icon }: Doctor) {
    await DoctorRepository.create({ id: 0, name, specialty, icon });
  }

  public static async update(doctor: Doctor) {
    await DoctorRepository.update(doctor);
  }

  public static async delete(id: number) {
    await DoctorRepository.delete(id);
  }
}