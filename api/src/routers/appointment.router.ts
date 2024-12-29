import { Jwt } from "@/auth/Jwt";
import { Router } from "express";
import { AppointmentController } from "@/controllers/appointment.controller";

const router = Router();

router.get("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.findByUser);
router.post("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.create);

export { router as appointmentRouter };