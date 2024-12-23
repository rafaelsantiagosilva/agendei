import { db } from "@/lib/prisma";
import { Doctor } from "@prisma/client";

export class DoctorRepository {
  public static async getAll(name: string | undefined) {
    return await db.doctor.findMany({
      where: name ? {
        name: {
          contains: name,
        }
      } : {},
      orderBy: {
        name: "asc"
      }
    });
  }

  public static async create({ name, specialty, icon }: Doctor) {
    await db.doctor.create({
      data: {
        name,
        specialty,
        icon
      }
    });
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