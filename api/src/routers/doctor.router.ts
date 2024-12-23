import { DoctorController } from "@/controllers/doctor.controller";
import { Router } from "express";

const router = Router();

router.get("/", DoctorController.getAll);
router.post("/", DoctorController.create);
router.put("/:id", DoctorController.update)
router.delete("/:id", DoctorController.delete);

export { router as doctorRouter };