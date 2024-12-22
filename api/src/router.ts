import { Router } from "express";
import { DoctorController } from "@/controllers/doctor.controller";

const router = Router();

router.get("/doctors");

export { router };