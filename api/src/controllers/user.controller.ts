import { RequestWithUserId } from "@/interfaces/RequestWithUserId";
import { UserService } from "@/services/user.service";
import { User } from "@prisma/client";
import { Request, Response } from "express";

export class UserController {
  public static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(`> Error in get all users: ${error}`);
      res.status(500).json({ message: "Error in get all users", error });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const { name, email, password }: User = req.body;
      const userToken = await UserService.create({ id: 0, name, email, password });
      res.status(201).json({ message: "User created with success!", userToken });
    } catch (error) {
      console.error(`> Error in create user: ${error}`);
      res.status(500).json({ message: "Error in create user", error });
    }
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);

    if (!user)
      res.status(401).json({ error: "Email or password are invalid" });

    res.status(200).json(user);
  }

  public static async profile(req: Request, res: Response) {
    try {
      const userId = (req as RequestWithUserId)["userId"];
      const user = await UserService.profile(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(`> Error in get the user profile: ${error}`);
      res.status(500).json({ message: "Error in get the user profile", error });
    }
  }
}