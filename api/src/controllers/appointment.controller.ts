import { Request, Response } from "express";
import { RequestWithUserId } from "@/interfaces/RequestWithUserId";
import { AppointmentService } from "@/services/appointment.service";

export class AppointmentController {
  public static async findByUser(req: Request, res: Response) {
    const userId = (req as RequestWithUserId)["userId"];
    const appointments = await AppointmentService.getAll(userId);
    return res.json(appointments);
  }
}