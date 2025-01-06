import { db } from "@/lib/prisma";
import { Doctor, DoctorService, Service } from "@prisma/client";

interface ServiceWithPrice {
  id: number;
  description: string;
  price: number;
}

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

  public static async getById(id: number) {
    return await db.doctor.findFirst({
      where: { id }
    });
  }

  public static async getServices(doctor_id: number) {
    const doctorServices = await db.doctorService.findMany({
      where: {
        doctor_id
      },
      include: {
        service: {
          select: {
            description: true
          }
        }
      },
    })

    return doctorServices.map((doctorService): ServiceWithPrice => {
      return {
        id: doctorService.service_id,
        description: doctorService.service.description,
        price: Number(doctorService.price)
      }
    })
  }

  public static async create({ name, specialty, icon }: Doctor) {
    const doctor = await db.doctor.create({
      data: {
        name,
        specialty,
        icon
      }
    });

    return doctor.id;
  }

  public static async createServices(doctorServices: DoctorService[]) {
    await db.doctorService.createMany({ data: doctorServices });
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