import { DoctorService } from "@/services/doctor.service";
import { Doctor } from "@prisma/client";
import { Request, Response } from "express";

export class DoctorController {
  public static async getAll(req: Request, res: Response) {
    try {
      const name = req.query.name?.toString();
      const doctors = await DoctorService.getAll(name);
      res.status(200).json(doctors);
    } catch (error) {
      console.error(`> Error in get all doctors: ${error}`);
      res.status(500).send({ message: "Error in get all doctors", error });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const { name, specialty, icon }: Doctor = req.body;
      await DoctorService.create({ id: 0, name, specialty, icon });
      res.status(201).json({ message: "Doctor created with success!" });
    } catch (error) {
      console.error(`> Error in create doctor: ${error}`);
      res.status(500).json({ message: "Error in create doctor", error });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, specialty, icon } = req.body;
      await DoctorService.update({ id, name, specialty, icon });
      res.status(200).json({ message: "Doctor was updated with success!" });
    } catch (error) {
      console.error(`> Error in update doctor: ${error}`);
      res.status(500).json({ message: "Error in update doctor", error });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await DoctorService.delete(id);
      res.status(204).end();
    } catch (error) {
      console.error(`> Error in delete doctor: ${error}`);
      res.status(500).json({ message: "Error in delete doctor", error });
    }
  }
}