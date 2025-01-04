import { Jwt } from "@/auth/Jwt";
import { ServiceController } from "@/controllers/service.controller";
import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => { Jwt.validateToken(req, res, next) }, ServiceController.getAll);

export { router as serviceRouter };