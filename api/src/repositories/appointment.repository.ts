import { db } from "@/lib/prisma";
import { Doctor, Service } from "@prisma/client";

export class AppointmentRepository {
  public static async getAll(userId: number) {
    return await db.appointment.findMany({
      where: {
        user_id: userId,
      },
      include: {
        service: {
          select: {
            description: true,
          },
        },
        doctor: {
          select: {
            name: true,
            specialty: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        doctorService: {
          select: {
            price: true,
          },
        },
      },
      orderBy: [
        { booking_date: "asc" },
        { booking_hour: "asc" }
      ]
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