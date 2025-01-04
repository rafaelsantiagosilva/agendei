import { db } from "@/lib/prisma"

export class ServiceRepository {
  public static async getAll() {
    return await db.service.findMany({
      orderBy: {
        description: "asc"
      }
    });
  }
}