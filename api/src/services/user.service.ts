import { UserRepository } from "@/repositories/user.repository";
import { Jwt } from "@/auth/Jwt";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserService {
  public static async getAll() {
    const users = await UserRepository.getAll();
    return users;
  }

  public static async create({ name, email, password }: User) {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({ id: 0, name, email, password: hashPassword });
    const userToken = Jwt.createToken(user.id);
    return userToken;
  }

  public static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user)
      return undefined;

    if (await bcrypt.compare(password, user.password)) {
      const { id, name, email } = user;
      const token = Jwt.createToken(id);
      return { id, name, email, token };
    }

    return undefined;
  }

  public static async profile(userId: number) {
    const user = await UserRepository.findById(userId);
    return user;
  }

  public static async update(User: User) {
    await UserRepository.update(User);
  }

  public static async delete(id: number) {
    await UserRepository.delete(id);
  }
}