import { DoctorService } from "@/services/doctor.service";
import { Doctor, DoctorService as DoctorServiceModel } from "@prisma/client";
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

  public static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const doctor = await DoctorService.getById(id);
      res.status(200).json(doctor);
    } catch (error) {
      console.error(`> Error in get the doctors: ${error}`);
      res.status(500).send({ message: "Error in get the doctor", error });
    }
  }

  public static async getServices(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const services = await DoctorService.getServices(id);
      res.status(200).json(services);
    } catch (error) {
      console.error(`> Error in get all services doctor: ${error}`);
      res.status(500).send({ message: "Error in get all services doctor", error });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const { name, specialty, icon }: Doctor = req.body.doctor;
      const doctorServices: DoctorServiceModel[] = req.body.doctorServices;
      const doctorId = await DoctorService.create({ id: 0, name, specialty, icon });
      const newDoctorServices: DoctorServiceModel[] = [];
      doctorServices.forEach(doctorService => {
        doctorService.doctor_id = doctorId;
        newDoctorServices.push(doctorService);
      });
      await DoctorService.createServices(newDoctorServices);
      res.status(201).json({ message: "Doctor created with success!" });
    } catch (error) {
      console.error(`> Error in create doctor: ${error}`);
      res.status(500).json({ message: "Error in create doctor", error });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, specialty, icon } = req.body.doctor;
      const doctorServices: DoctorServiceModel[] = req.body.doctorServices;
      const newDoctorServices: DoctorServiceModel[] = [];
      doctorServices.forEach(doctorService => {
        doctorService.doctor_id = id;
        newDoctorServices.push(doctorService);
      });
      await DoctorService.update({ id, name, specialty, icon });
      await DoctorService.createServices(newDoctorServices);
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