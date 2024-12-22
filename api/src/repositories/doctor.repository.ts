import { db } from "@/lib/prisma";
import { Doctor } from "@prisma/client";

export class DoctorRepository {
  public static async getAll() {
    return await db.doctor.findMany();
  }

  public static async create(doctor: Doctor) {
    await db.doctor.create({ data: doctor });
  }

  public static async update(doctor: Doctor) {
    await db.doctor.update({
      data: doctor, where: {
        id: doctor.id
      }
    });
  }

  public static async delete(id: number) {
    await db.doctor.delete({
      where: {
        id
      }
    });
  }
}