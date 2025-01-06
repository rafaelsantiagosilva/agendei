import { DoctorRepository } from "@/repositories/doctor.repository";
import { Doctor, DoctorService as DoctorServiceModel } from "@prisma/client";

export class DoctorService {
  public static async getAll(name: string | undefined) {
    const doctors = await DoctorRepository.getAll(name);
    return doctors;
  }

  public static async getById(id: number) {
    const doctor = await DoctorRepository.getById(id);
    return doctor;
  }

  public static async getServices(id: number) {
    const services = await DoctorRepository.getServices(id);
    return services;
  }

  public static async create({ name, specialty, icon }: Doctor) {
    return await DoctorRepository.create({ id: 0, name, specialty, icon });
  }

  public static async createServices(doctorServices: DoctorServiceModel[]) {
    await DoctorRepository.createServices(doctorServices);
  }

  public static async update(doctor: Doctor) {
    await DoctorRepository.update(doctor);
  }

  public static async delete(id: number) {
    await DoctorRepository.delete(id);
  }
}