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

  public static async getById(req: Request, res: Response) {
    try {
      const id = req.params?.id;
      const appointment = await AppointmentService.getById(Number(id));
      res.status(200).json(appointment);
    } catch (error) {
      console.error(`> Error in get the appointment by id: ${error}`);
      res.status(500).send({ message: "Error in get the appointment by id", error });
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

  public static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { user_id, doctor_id, service_id, booking_date, booking_hour } = req.body;
      await AppointmentService.update({ id, user_id, doctor_id, service_id, booking_date, booking_hour });
      res.status(200).json({ message: "Appointment updated with success!" });
    } catch (error) {
      console.error(`> Error in update appointment: ${error}`);
      res.status(500).json({ message: "Error in update appointment", error });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AppointmentService.delete(Number(id));
      res.status(204).end();
    } catch (error) {
      console.error(`> Error in delete appointment: ${error}`);
      res.status(500).json({ message: "Error in delete appointment", error });
    }
  }
}