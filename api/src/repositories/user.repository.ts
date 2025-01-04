import { db } from "@/lib/prisma";
import { User } from "@prisma/client";

export class UserRepository {
  public static async getAll() {
    return await db.user.findMany({
      orderBy: {
        name: "asc"
      }
    });
  }

  public static async findByEmail(email: string) {
    return await db.user.findUnique({
      where: {
        email
      }
    });
  }

  public static async findById(id: number) {
    return await db.user.findFirst({
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

  public static async create({ name, email, password }: User) {
    const user = await db.user.create({
      data: {
        name,
        email,
        password
      }
    });

    return user;
  }

  public static async update(user: User) {
    await db.user.update({
      data: user, where: {
        id: user.id
      }
    });
  }

  public static async delete(id: number) {
    await db.user.delete({
      where: {
        id
      }
    });
  }
}