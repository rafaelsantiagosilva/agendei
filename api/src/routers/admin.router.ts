import { Router } from "express";
import { AdminController } from "@/controllers/admin.controller";
import { Jwt } from "@/auth/Jwt";

const router = Router();

router.post("/register", AdminController.create);
router.post("/login", AdminController.login);
router.get("/profile", (req, res, next) => { Jwt.validateToken(req, res, next) }, AdminController.profile);

router.get("/appointments", (req, res, next) => { Jwt.validateToken(req, res, next) }, AdminController.getAppointments);
router.post("/appointments", (req, res, next) => { Jwt.validateToken(req, res, next) }, AdminController.createAppointment);

export { router as adminRouter };