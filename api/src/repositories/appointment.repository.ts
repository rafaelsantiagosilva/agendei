import { db } from "@/lib/prisma";
import { Appointment } from "@prisma/client";

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

  public static async getAllToAdmin() {
    return await db.appointment.findMany({
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

  public static async getById(id: number) {
    return await db.appointment.findUnique({
      where: {
        id
      }
    });
  }

  public static async create({ user_id, doctor_id, service_id, booking_date, booking_hour }: Appointment) {
    const isoBookingDate = new Date(booking_date).toISOString();
    await db.appointment.create({
      data: {
        user_id,
        doctor_id,
        service_id,
        booking_date: isoBookingDate,
        booking_hour
      }
    });
  }

  public static async update({ id, user_id, doctor_id, service_id, booking_date, booking_hour }: Appointment) {
    const isoBookingDate = new Date(booking_date).toISOString();
    await db.appointment.update({
      where: {
        id: id
      },
      data: {
        user_id, 
        doctor_id, 
        service_id, 
        booking_date: isoBookingDate, 
        booking_hour
      }
    });
  }

  public static async delete(id: number) {
    await db.appointment.delete({
      where: {
        id
      }
    });
  }
}