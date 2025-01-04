import { db } from "@/lib/prisma";
import { Admin } from "@prisma/client";

export class AdminRepository {
  public static async findByEmail(email: string) {
    return await db.admin.findUnique({
      where: {
        email
      }
    });
  }

  public static async findById(id: number) {
    return await db.admin.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
  }

  public static async create({ name, email, password }: Admin) {
    const admin = await db.admin.create({
      data: {
        name,
        email,
        password
      }
    });

    return admin;
  }

  public static async update(admin: Admin) {
    await db.admin.update({
      data: admin, where: {
        id: admin.id
      }
    });
  }

  public static async delete(id: number) {
    await db.admin.delete({
      where: {
        id
      }
    });
  }
}