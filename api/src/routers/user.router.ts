import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { Jwt } from "@/auth/Jwt";

const router = Router();

router.get("/", (req, res, next) => {Jwt.validateToken(req, res, next)}, UserController.getAll);
router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.get("/profile", (req, res, next) => { Jwt.validateToken(req, res, next) }, UserController.profile);

export { router as userRouter };