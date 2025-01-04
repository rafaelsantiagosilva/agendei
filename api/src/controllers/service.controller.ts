import { ServiceService } from "@/services/service.service";
import { Request, Response } from "express";

export class ServiceController {
  public static async getAll(req: Request, res: Response) {
    try {
      const services = await ServiceService.getAll();
      res.status(200).json(services);
    } catch (error) {
      console.error(`> Error in get all services: ${error}`);
      res.status(500).json({ message: "Error in get all services", error });
    }
  }
}