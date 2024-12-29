import { Request, Response } from "express";
import { RequestWithUserId } from "@/interfaces/RequestWithUserId";
import { AppointmentService } from "@/services/appointment.service";

export class AppointmentController {
  public static async findByUser(req: Request, res: Response) {
    try {
      const userId = (req as RequestWithUserId)["userId"];
      const appointments = await AppointmentService.getAll(userId);
      res.status(200).json(appointments);
    } catch (error) {
      console.error(`> Error in get the appointments of the user: ${error}`);
      res.status(500).send({
        message: `Error in get the appointments of the user: ${error}`,
        error
      });
    }

  }

  public static async create(req: Request, res: Response) {
    try {
      const userId = (req as RequestWithUserId)["userId"];
      const { doctor_id, service_id, booking_date, booking_hour } = req.body;
      await AppointmentService.create({ id: 0, user_id: userId, doctor_id, service_id, booking_date, booking_hour });
      res.status(201).send({ message: `Appointment created with success!` });
    } catch (error) {
      console.error(`> Error in create appointment: ${error}`);
      res.status(500).json({ message: "Error in create appointment", error });
    }
  }
}