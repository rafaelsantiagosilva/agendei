import { Jwt } from "@/auth/Jwt";
import { Router } from "express";
import { AppointmentController } from "@/controllers/appointment.controller";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => { Jwt.validateToken(req, res, next) }, AppointmentController.findByUser);

export { router as appointmentRouter };