import { Jwt } from "@/auth/Jwt";
import { Router } from "express";
import { AppointmentController } from "@/controllers/appointment.controller";

const router = Router();

router.get("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.findByUser);
router.get("/:id", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.getById);
router.post("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.create);
router.delete("/:id", (req, res, next) => { Jwt.validateToken(req, res, next) }, AppointmentController.delete);

export { router as appointmentRouter };