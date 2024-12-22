import { DoctorRepository } from "@/repositories/doctor.repository";

export class DoctorService {
  public static async getAll() {
    const doctors = await DoctorRepository.getAll();
    return doctors;
  }
}