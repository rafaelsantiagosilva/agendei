import { AdminRepository } from "@/repositories/admin.repository";
import { Jwt } from "@/auth/Jwt";
import { Admin } from "@prisma/client";
import bcrypt from "bcrypt";
import { AppointmentRepository } from "@/repositories/appointment.repository";

export class AdminService {
  public static async create({ name, email, password }: Admin) {
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await AdminRepository.create({ id: 0, name, email, password: hashPassword });
    const adminToken = Jwt.createToken(admin.id);
    return adminToken;
  }

  public static async getAppointments() {
    return await AppointmentRepository.getAllToAdmin();
  }

  public static async login(email: string, password: string) {
    const admin = await AdminRepository.findByEmail(email);

    if (!admin)
      return undefined;

    if (await bcrypt.compare(password, admin.password)) {
      const { id, name, email } = admin;
      const token = Jwt.createToken(id);
      return { id, name, email, token };
    }

    return undefined;
  }

  public static async profile(adminId: number) {
    const admin = await AdminRepository.findById(adminId);
    return admin;
  }

  public static async update(admin: Admin) {
    await AdminRepository.update(admin);
  }

  public static async delete(id: number) {
    await AdminRepository.delete(id);
  }
}