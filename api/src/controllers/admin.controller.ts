import { RequestWithUserId } from "@/interfaces/RequestWithUserId";
import { AdminService } from "@/services/admin.service";
import { Admin } from "@prisma/client";
import { Request, Response } from "express";

export class AdminController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, email, password }: Admin = req.body;
      const adminToken = await AdminService.create({ id: 0, name, email, password });
      res.status(201).json({ message: "Admin created with success!", adminToken });
    } catch (error) {
      console.error(`> Error in create admin: ${error}`);
      res.status(500).json({ message: "Error in create admin", error });
    }
  }

  public static async getAppointments(req: Request, res: Response) {
    try {
      const appointments = await AdminService.getAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      console.error(`> Error in get appointments to admin: ${error}`);
      res.status(500).json({ message: "Error in get appointments to admin", error });
    }
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const admin = await AdminService.login(email, password);

    if (!admin)
      res.status(401).json({ error: "Email or password are invalid" });

    res.status(200).json(admin);
  }

  public static async profile(req: Request, res: Response) {
    try {
      const adminId = (req as RequestWithUserId)["userId"];
      const admin = await AdminService.profile(adminId);
      res.status(200).json(admin);
    } catch (error) {
      console.error(`> Error in get the admin profile: ${error}`);
      res.status(500).json({ message: "Error in get the admin profile", error });
    }
  }
}