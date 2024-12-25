import { UserRepository } from "@/repositories/user.repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserService {
  public static async getAll(name: string | undefined) {
    const users = await UserRepository.getAll(name);
    return users;
  }

  public static async create({ name, email, password }: User) {
    const hashPassword = await bcrypt.hash(password, 10);
    await UserRepository.create({ id: 0, name, email, password: hashPassword });
  }

  public static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user)
      return undefined;

    if (await bcrypt.compare(password, user.password)) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return undefined;
  }

  public static async update(User: User) {
    await UserRepository.update(User);
  }

  public static async delete(id: number) {
    await UserRepository.delete(id);
  }
}