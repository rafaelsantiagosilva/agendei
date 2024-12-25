import { UserService } from "@/services/user.service";
import { User } from "@prisma/client";
import { Request, Response } from "express";

export class UserController {
  public static async getAll(req: Request, res: Response) {

  }

  public static async create(req: Request, res: Response) {
    try {
      const { name, email, password }: User = req.body;
      await UserService.create({ id: 0, name, email, password });
      res.status(201).json({ message: "User created with success!" });
    } catch (error) {
      console.error(`> Error in create user: ${error}`);
      res.status(500).json({ message: "Error in create user", error });
    }
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);

    if (!user)
      res.status(401).json({ error: "E-mail ou senha inválido" });

    res.status(200).json(user);
  }

  public static async update(req: Request, res: Response) {

  }

  public static async delete(req: Request, res: Response) {

  }
}