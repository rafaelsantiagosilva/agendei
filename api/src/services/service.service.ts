import { ServiceRepository } from "@/repositories/service.repository";

export class ServiceService {
  public static async getAll() {
    const services = await ServiceRepository.getAll();
    return services;
  }
}