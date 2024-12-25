import { DoctorController } from "@/controllers/doctor.controller";
import { Jwt } from "@/auth/Jwt";
import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, DoctorController.getAll);
router.post("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, DoctorController.create);
router.put("/:id", (req, res, next) => { Jwt.validateToken(req, res, next) }, DoctorController.update)
router.delete("/:id", (req, res, next) => { Jwt.validateToken(req, res, next) }, DoctorController.delete);

router.get("/:id/services", (req, res, next) => { Jwt.validateToken(req, res, next) }, DoctorController.getServices);

export { router as doctorRouter };